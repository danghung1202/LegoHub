using System.Collections.Generic;

namespace LegoHub.Data.Config
{
    public class YoutubeConfig
    {
        public string APIKey { get; set; }
        public string Keyword { get; set; }
        public List<YoutubeChannel> Channels { get; set; }
    }

    public class YoutubeChannel
    {
        public string ID { get; set; }
        public string Name { get; set; }

    }
}
