using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Abstractions;
using System.Linq;
using AppKit;
using Astound.ReactNative.macOS.Extensions;
using Foundation;
using Lamar;
using Tricycle.Diagnostics;
using Tricycle.Diagnostics.Utilities;
using Tricycle.Globalization;
using Tricycle.IO;
using Tricycle.IO.macOS;
using Tricycle.Media;
using Tricycle.Media.FFmpeg;
using Tricycle.Media.FFmpeg.Models.Config;
using Tricycle.Media.FFmpeg.Serialization.Argument;
using Tricycle.Models;
using Tricycle.Models.Config;
using Tricycle.Models.Templates;
using Tricycle.Utilities;

namespace Tricycle.UI.macOS
{
    [Register ("AppDelegate")]
	public class AppDelegate : ReactAppDelegate
	{
        #region Fields

        readonly IAppManager _appManager;
		IConfigManager<Dictionary<string, JobTemplate>> _templateManager;
		TextWriterTraceListener _traceListener;

        #endregion

        #region Constructors

        public AppDelegate ()
		{
			_appManager = new AppManager();

			_appManager.FileOpened += fileName =>
			{
				var url = new NSUrl($"file://{Uri.EscapeUriString(fileName)}");

				NSDocumentController.SharedDocumentController.NoteNewRecentDocumentURL(url);
			};
			_appManager.QuitConfirmed += () =>
			{
				NSApplication.SharedApplication.Terminate(this);
			};

			new AppDocumentController(_appManager);
		}

        #endregion

        #region Public Methods

        public override void DidFinishLaunching (NSNotification notification)
		{
			NSApplication.SharedApplication.MainWindow.Delegate = new MainWindowDelegate(_appManager);

            InitializeAppState();
            PopulateTemplateMenu();
		}

		public override void WillTerminate (NSNotification notification)
		{
            if (_traceListener != null)
            {
                _traceListener.Flush();
            }
        }

        public override bool ApplicationShouldTerminateAfterLastWindowClosed(NSApplication sender) => true;

        public override NSApplicationTerminateReply ApplicationShouldTerminate(NSApplication sender) =>
            ShouldClose() ? NSApplicationTerminateReply.Now : NSApplicationTerminateReply.Cancel;

        public override bool OpenFile(NSApplication sender, string filename)
        {
            if (!File.Exists(filename))
            {
                return false;
            }

            _appManager.RaiseFileOpened(filename);
            return true;
        }

        [Export("openDocument:")]
        public void OpenFile(NSObject sender)
        {
            var browser = new FileBrowser();
            var result = browser.BrowseToOpen().GetAwaiter().GetResult();

            if (result.Confirmed)
            {
                _appManager.RaiseFileOpened(result.FileName);
            }
        }

        [Action("openPreferences:")]
        public void OpenPreferences(NSObject sender)
        {
            _appManager.RaiseModalOpened(Modal.Config);
        }

        [Action("saveTemplate:")]
        public void SaveTemplate(NSObject sender)
        {
            string name = _appManager.Ask("Save Template", "Please enter a name for the template:", GetNewTemplateName());

            if (name != null)
            {
                name = name.Trim();
                bool overwrite = false;

                if (_templateManager.Config?.ContainsKey(name) == true)
                {
                    overwrite = _appManager.Confirm("Overwrite Template",
                                                    "A template with that name exists. Would you like to overwrite it?");

                    if (!overwrite)
                    {
                        return;
                    }
                }

                _appManager.RaiseTemplateSaved(name);

                if (!overwrite)
                {
                    PopulateTemplateMenu();
                }
            }
        }

        [Action("manageTemplates:")]
        public void ManageTemplates(NSObject sender)
        {
            _appManager.RaiseModalOpened(Modal.Config);
        }

        [Action("viewPreview:")]
        public void ViewPreview(NSObject sender)
        {
            _appManager.RaiseModalOpened(Modal.Preview);
        }

        [Action("validateMenuItem:")]
        public bool ValidateMenuItem(NSMenuItem item)
        {
            if (item.ParentItem?.Title == "Templates")
            {
                return IsTemplateMenuItemValid(item);
            }

            switch (item.Title)
            {
                case "Manage…":
                case "Open…":
                case "Preferences…":
                    return !_appManager.IsBusy && !_appManager.IsModalOpen;
                case "Preview…":
                case "Save As…":
                    return !_appManager.IsBusy && !_appManager.IsModalOpen && _appManager.IsValidSourceSelected;
                default:
                    return true;
            }
        }

        #endregion

        #region Private Methods

        void InitializeAppState()
        {
            const string FFMPEG_CONFIG_NAME = "ffmpeg.json";
            const string TRICYCLE_CONFIG_NAME = "tricycle.json";
            const string TEMPLATE_CONFIG_NAME = "templates.json";

            var version = NSBundle.MainBundle.ObjectForInfoDictionary("CFBundleShortVersionString").ToString();
            var revision = NSBundle.MainBundle.ObjectForInfoDictionary("CFBundleVersion").ToString();

            AppState.AppName = NSBundle.MainBundle.ObjectForInfoDictionary("CFBundleName").ToString();
            AppState.AppVersion = Version.TryParse(version, out var a) && int.TryParse(revision, out var b)
                                  ? new Version(a.Major, a.Minor, a.Build, b)
                                  : new Version();

            string resourcePath = NSBundle.MainBundle.ResourcePath;
            string defaultConfigPath = Path.Combine(resourcePath, "Config");
            string ffmpegPath = Path.Combine(resourcePath, "Tools", "FFmpeg");
            string ffmpegFileName = Path.Combine(ffmpegPath, "ffmpeg");
            string userPath = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            string userConfigPath = Path.Combine(userPath, "Library", "Preferences", "Tricycle");
            var processCreator = new Func<IProcess>(() => new ProcessWrapper());
            var processRunner = new ProcessRunner(processCreator);
            var fileSystem = new FileSystem();
            var jsonSerializer = new JsonSerializer();
            var ffmpegConfigManager = new FFmpegConfigManager(fileSystem,
                                                              jsonSerializer,
                                                              Path.Combine(defaultConfigPath, FFMPEG_CONFIG_NAME),
                                                              Path.Combine(userConfigPath, FFMPEG_CONFIG_NAME));
            var tricycleConfigManager = new TricycleConfigManager(fileSystem,
                                                                  jsonSerializer,
                                                                  Path.Combine(defaultConfigPath, TRICYCLE_CONFIG_NAME),
                                                                  Path.Combine(userConfigPath, TRICYCLE_CONFIG_NAME));
            _templateManager =
                new FileConfigManager<Dictionary<string, JobTemplate>>(
                    fileSystem,
                    jsonSerializer,
                    Path.Combine(defaultConfigPath, TEMPLATE_CONFIG_NAME),
                    Path.Combine(userConfigPath, TEMPLATE_CONFIG_NAME));

            ffmpegConfigManager.Load();
            tricycleConfigManager.Load();
            _templateManager.Load();

            if (tricycleConfigManager.Config.Trace)
            {
                EnableLogging(userPath);
            }

            _templateManager.ConfigChanged += config => PopulateTemplateMenu();

            var ffmpegArgumentGenerator = new FFmpegArgumentGenerator(new ArgumentPropertyReflector());

            AppState.IocContainer = new Container(_ =>
            {
                _.For<IConfigManager<FFmpegConfig>>().Use(ffmpegConfigManager);
                _.For<IConfigManager<TricycleConfig>>().Use(tricycleConfigManager);
                _.For<IConfigManager<Dictionary<string, JobTemplate>>>().Use(_templateManager);
                _.For<IFileBrowser>().Use<FileBrowser>();
                _.For<IFolderBrowser>().Use<FolderBrowser>();
                _.For<IProcessUtility>().Use(ProcessUtility.Self);
                _.For<IMediaInspector>().Use(new MediaInspector(Path.Combine(ffmpegPath, "ffprobe"),
                                                                processRunner,
                                                                ProcessUtility.Self,
                                                                jsonSerializer));
                _.For<ICropDetector>().Use(new CropDetector(ffmpegFileName,
                                                            processRunner,
                                                            ffmpegConfigManager,
                                                            ffmpegArgumentGenerator));
                _.For<IInterlaceDetector>().Use(new InterlaceDetector(ffmpegFileName,
                                                                      processRunner,
                                                                      ffmpegArgumentGenerator));
                _.For<IFileSystem>().Use(fileSystem);
                _.For<ITranscodeCalculator>().Use<TranscodeCalculator>();
                _.For<IArgumentPropertyReflector>().Use<ArgumentPropertyReflector>();
                _.For<IMediaTranscoder>().Use(new MediaTranscoder(ffmpegFileName,
                                                                  processCreator,
                                                                  ffmpegConfigManager,
                                                                  ffmpegArgumentGenerator));
                _.For<IAppManager>().Use(_appManager);
                _.For<IPreviewImageGenerator>().Use(new PreviewImageGenerator(ffmpegFileName,
                                                                              processRunner,
                                                                              ffmpegConfigManager,
                                                                              ffmpegArgumentGenerator,
                                                                              fileSystem));
                _.For<ILanguageService>().Use<LanguageService>();
            });
            AppState.DefaultDestinationDirectory = Path.Combine(userPath, "Movies");
        }

        void EnableLogging(string userPath)
        {
            string userLogPath = Path.Combine(userPath, "Library", "Logs", "Tricycle");

            if (!Directory.Exists(userLogPath))
            {
                try
                {
                    Directory.CreateDirectory(userLogPath);
                }
                catch { }
            }

            if (Directory.Exists(userLogPath))
            {
                string logFileName = Path.Combine(userLogPath, $"tricycle-{DateTime.Now:yyyy-MM-dd}.log");

                _traceListener = new TimestampTextWriterTraceListener(logFileName);

                Trace.Listeners.Add(_traceListener);
                Trace.AutoFlush = true;
            }
        }

        void PopulateTemplateMenu()
        {
            var menu = NSApplication.SharedApplication.MainWindow.Menu.ItemWithTitle("Templates").Submenu;

            // There are 3 items that are static
            for (int i = menu.Items.Length - 1; i > 2; i--)
            {
                menu.RemoveItemAt(i);
            }

            foreach (var name in _templateManager.Config.Keys.OrderBy(k => k))
            {
                menu.AddItem(CreateTemplateMenuItem(name));
            }
        }

        NSMenuItem CreateTemplateMenuItem(string name)
        {
            return new NSMenuItem(name, "", (s, e) => _appManager.RaiseTemplateApplied(name), IsTemplateMenuItemValid);
        }

        bool IsTemplateMenuItemValid(NSMenuItem item)
        {
            return !_appManager.IsBusy && !_appManager.IsModalOpen && _appManager.IsValidSourceSelected;
        }

        string GetNewTemplateName()
        {
            var templates = _templateManager.Config;
            int i = 0;
            string result;

            do
            {
                string suffix = i > 0 ? $" {i}" : string.Empty;
                result = $"New Template{suffix}";
                i++;
            }
            while (templates.ContainsKey(result));

            return result;
        }

        bool ShouldClose()
        {
            if (!_appManager.IsQuitConfirmed)
            {
                _appManager.RaiseQuitting();
            }

            return _appManager.IsQuitConfirmed;
        }

        #endregion
    }
}
