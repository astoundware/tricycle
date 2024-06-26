﻿using System;
using System.Windows.Input;

namespace Tricycle.UI.ViewModels
{
    public class VideoPresetViewModel : ViewModelBase
    {
        string _name;
        string _width;
        string _height;
        bool _isRemoveEnabled;

        public VideoPresetViewModel()
        {
            RemoveCommand = new Command(() => Removed?.Invoke(), () => IsRemoveEnabled);
        }

        public string Name
        {
            get => _name;
            set
            {
                if (value != _name)
                {
                    SetProperty(ref _name, value);
                    Modified?.Invoke();
                }
            }
        }

        public string Width
        {
            get => _width;
            set
            {
                if (value != _width)
                {
                    SetProperty(ref _width, value);
                    Modified?.Invoke();
                }
            }
        }

        public string Height
        {
            get => _height;
            set
            {
                if (value != _height)
                {
                    SetProperty(ref _height, value);
                    Modified?.Invoke();
                }
            }
        }

        public bool IsRemoveEnabled
        {
            get => _isRemoveEnabled;
            set
            {
                SetProperty(ref _isRemoveEnabled, value);
                ((Command)RemoveCommand).ChangeCanExecute();
            }
        }

        public ICommand RemoveCommand { get; }

        public event Action Modified;
        public event Action Removed;

        public void ClearHandlers()
        {
            if (Modified != null)
            {
                foreach (Action handler in Modified.GetInvocationList())
                {
                    Modified -= handler;
                }
            }

            if (Removed != null)
            {
                foreach (Action handler in Removed.GetInvocationList())
                {
                    Removed -= handler;
                }
            }
        }
    }
}
