namespace Tricycle.UI.Models
{
    public class Template : IKeyed
    {
        public string Key { get; set; }
        public string Name { get; set; }
        public bool RemoveDisabled { get; set; }
    }
}