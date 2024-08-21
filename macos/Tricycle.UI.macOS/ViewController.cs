using System;
using Astound.ReactNative.macOS.Extensions;
using Foundation;
using ObjCRuntime;

namespace Tricycle.UI.macOS
{
    public partial class ViewController : ReactViewControllerBase
	{
		public ViewController (NativeHandle handle) : base (handle)
		{
		}

		public override void ViewDidLoad ()
		{
			base.ViewDidLoad ();

			// Do any additional setup after loading the view.
		}

		public override NSObject RepresentedObject {
			get {
				return base.RepresentedObject;
			}
			set {
				base.RepresentedObject = value;
				// Update the view, if already loaded.
			}
		}

        protected override string JsModuleName => "Tricycle";
    }
}
