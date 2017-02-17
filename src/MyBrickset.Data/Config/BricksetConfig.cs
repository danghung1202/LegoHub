using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyBrickset.Data.Config
{
    public class BricksetConfig
    {
        public string ApiKey { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
