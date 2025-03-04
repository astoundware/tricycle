using System;

namespace Tricycle.UI.Models
{
    public class DisplayValue : IEquatable<DisplayValue>
    {
        public string Key { get; }
        public string Text { get; }

        public DisplayValue(string key, string text)
        {
            Key = key;
            Text = text;
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