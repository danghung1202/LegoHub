using System.Collections.Generic;

namespace LegoHub.Data.Models
{
    /// <summary>
    /// Stores the result data for the ID token verification.
    /// </summary>
    public class BoardResponse
    {
        public List<Board> Body { get; set; }
    }

    public class Board
    {
        public string Name { get; set; }
        public string Href { get; set; }
        public string Src { get; set; }
    }

}
