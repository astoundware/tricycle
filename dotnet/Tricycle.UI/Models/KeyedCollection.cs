using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Tricycle.UI.Models
{
    public class KeyedCollection<T> : KeyedCollection<string, T> where T : IKeyed
    {
        public bool Replace(T item)
        {
            int i = 0;
            bool found = false;

            foreach (T keyed in this)
            {
                if (keyed.Key == item.Key)
                {
                    found = true;
                    break;
                }

                i++;
            }

            if (!found)
            {
                return false;
            }

            RemoveAt(i);
            Insert(i, item);

            return true;
        }

        protected override string GetKeyForItem(T item) => item.Key;
    }

    public static class KeyedCollectionExtensions
    {
        public static KeyedCollection<T> ToKeyedCollection<T>(this IEnumerable<T> enumerable) where T : IKeyed
        {
            var result = new KeyedCollection<T>();

            foreach (T keyed in enumerable)
            {
                result.Add(keyed);
            }

            return result;
        }
    }
}