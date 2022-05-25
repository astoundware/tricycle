using AppKit;
using Foundation;

namespace Tricycle.UI.macOS
{
    public class MainWindowDelegate : NSWindowDelegate
	{
        readonly IAppManager _appManager;

		public MainWindowDelegate(IAppManager appManager)
		{
            _appManager = appManager;
		}

        public override bool WindowShouldClose(NSObject sender)
        {
            if (!_appManager.IsQuitConfirmed)
            {
                _appManager.RaiseQuitting();
            }

            return _appManager.IsQuitConfirmed;
        }
    }
}

