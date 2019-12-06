﻿using System;
namespace Tricycle.Media.FFmpeg.Serialization.Argument
{
    public enum Priority
    {
        PreInput,
        Input,
        PostInput,
        End
    }

    [AttributeUsage(AttributeTargets.Property)]
    public class ArgumentPriorityAttribute : Attribute
    {
        public Priority Priority { get; }

        public ArgumentPriorityAttribute(Priority priority)
        {
            Priority = priority;
        }
    }
}
