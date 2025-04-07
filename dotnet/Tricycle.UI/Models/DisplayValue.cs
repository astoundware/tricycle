using System;
using Newtonsoft.Json;

namespace Tricycle.UI.Models
{
    public class DisplayValue : IEquatable<DisplayValue>, IKeyed
    {
        public string Key { get; }

        public string Text { get; }

        [JsonIgnore]
        public object Value { get; }

        public DisplayValue(string key, string text)
        {
            Key = key;
            Text = text;
        }

        public DisplayValue(object value)
            : this(value.ToString(), value.ToString())
        {
            Value = value;
        }

        public DisplayValue(object value, string text)
            : this(value.ToString(), text)
        {
            Value = value;
        }

        public bool Equals(DisplayValue other)
        {
            if (other == null)
            {
                return false;
            }

            return Key == other.Key;
        }

        public override bool Equals(object obj) => obj is DisplayValue other && Equals(other);

        public override int GetHashCode() => Key.GetHashCode();

        public override string ToString() => Text ?? string.Empty;
    }
}