﻿using System;
using System.Windows.Input;
using Xamarin.Forms;

namespace Tricycle.UI.ViewModels
{
    public class VideoPresetViewModel : ViewModelBase
    {
        string _name;
        int? _width;
        int? _height;
        bool _canRemove;

        public VideoPresetViewModel()
        {
            RemoveCommand = new Command(
                () => Removed?.Invoke(),
                () =>
                {
                    if (!_canRemove)
                    {
                        _canRemove = !string.IsNullOrEmpty(Name) || Width.HasValue || Height.HasValue;
                    }

                    return _canRemove;
                });
        }

        public string Name
        {
            get => _name;
            set
            {
                if (value != _name)
                {
                    SetProperty(ref _name, value);
                    ((Command)RemoveCommand).ChangeCanExecute();
                    Modified?.Invoke();
                }
            }
        }

        public int? Width
        {
            get => _width;
            set
            {
                if (value != _width)
                {
                    SetProperty(ref _width, value);
                    ((Command)RemoveCommand).ChangeCanExecute();
                    Modified?.Invoke();
                }
            }
        }

        public int? Height
        {
            get => _height;
            set
            {
                if (value != _height)
                {
                    SetProperty(ref _height, value);
                    ((Command)RemoveCommand).ChangeCanExecute();
                    Modified?.Invoke();
                }
            }
        }

        public ICommand RemoveCommand { get; }

        public event Action Modified;
        public event Action Removed;
    }
}
