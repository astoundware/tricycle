namespace Tricycle.UI.Models
{
    public class VideoCodecQuality
    {
        public string Key { get; set; }
        public string CodecName { get; set; }
        public decimal Min { get; set; }
        public decimal Max { get; set; }
        public int Steps { get; set; }
    }
}