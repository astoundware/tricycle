namespace Tricycle.UI.Models
{
    public class VideoAspectRatioPreset : IKeyed
    {
        public string Key { get; set; }
        public string Name { get; set; }
        public decimal? Width { get; set; }
        public decimal? Height { get; set; }
        public bool RemoveDisabled { get; set; }
    }
}