namespace Tricycle.UI.Models
{
    public class VideoSizePreset : IKeyed
    {
        public string Key { get; set; }
        public string Name { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
        public bool RemoveDisabled { get; set; }
    }
}