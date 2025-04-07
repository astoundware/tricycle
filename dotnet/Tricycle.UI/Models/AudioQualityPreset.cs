namespace Tricycle.UI.Models
{
    public class AudioQualityPreset : IKeyed
    {
        public string Key { get; set; }
        public string Format { get; set; }
        public string Mixdown { get; set; }
        public decimal? Quality { get; set; }
        public bool RemoveDisabled { get; set; }
    }
}