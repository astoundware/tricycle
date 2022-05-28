using System.Globalization;
using Astound.ReactNative.macOS.Extensions;
using Astound.ReactNative.Modules;

namespace Tricycle.UI.macOS
{
    [ReactModule]
	public partial class LanguageManager : ReactEventEmitterBase
	{
		static class Event
        {
			public const string LanguageChange = "onLanguageChange";
		}

		public override string[] SupportedEvents => new string[]
		{
			Event.LanguageChange
		};

        [ReactMethod("init")]
		public void Init()
        {
			EmitEvent(Event.LanguageChange, CultureInfo.CurrentCulture.TwoLetterISOLanguageName);
        }
	}
}

