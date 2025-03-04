namespace Tricycle.UI.Models
{
    public class AudioQualityPreset
    {
        public string Key { get; set; }
        public string Format { get; set; }
        public string Mixdown { get; set; }
        public int Quality { get; set; }
        public bool RemoveDisabled { get; set; }
    }
}