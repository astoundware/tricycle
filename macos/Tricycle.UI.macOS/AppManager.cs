﻿using System;
using AppKit;
using CoreGraphics;

namespace Tricycle.UI.macOS
{
    public class AppManager : AppManagerBase
    {
        public override void Alert(string title, string message, Severity severity)
        {
            using (var alert = NSAlert.WithMessage(title,
                                                   "OK",
                                                   null,
                                                   null,
                                                   message))
            {
                alert.RunSheetModal(NSApplication.SharedApplication.MainWindow);
            }
        }

        public override bool Confirm(string title, string message)
        {
            const int OK = 0;

            using (var alert = NSAlert.WithMessage(title,
                                                   "Cancel",
                                                   "OK",
                                                   null,
                                                   message))
            {
                alert.AlertStyle = NSAlertStyle.Critical;

                return alert.RunSheetModal(NSApplication.SharedApplication.MainWindow) == OK;
            }
        }

        public override string Ask(string title, string message, string defaultValue)
        {
            const int OK = 1;
            string response = null;

            using (var alert = NSAlert.WithMessage(title,
                                                   "OK",
                                                   "Cancel",
                                                   null,
                                                   message))
            {
                using (var input = new NSTextField(new CGRect(0, 0, 200, 24)))
                {
                    alert.AccessoryView = input;
                    nint result;

                    do
                    {
                        input.StringValue = defaultValue;

                        result = alert.RunSheetModal(NSApplication.SharedApplication.MainWindow);

                        input.ValidateEditing();
                    }
                    while ((result == OK) && string.IsNullOrWhiteSpace(input.StringValue));

                    if (result == OK)
                    {
                        response = input.StringValue;
                    }
                }
            }

            return response;
        }
    }
}