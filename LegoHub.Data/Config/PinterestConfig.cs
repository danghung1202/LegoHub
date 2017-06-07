using System.Collections.Generic;

namespace LegoHub.Data.Config
{
    public class PinterestConfig
    {
        public string Token { get; set; }
        public List<PinterestUser> Users { get; set; }
    }

    public class PinterestUser
    {
        public string ID { get; set; }
        public string Username { get; set; }
        public Dictionary<string, int> Counts { get; set; }
        public List<PinterestBoard> Boards { get; set; }
    }

    public class PinterestBoard
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Href { get; set; }
        public string Title {get;set;}
        public string Description {get;set;}

    }
}
