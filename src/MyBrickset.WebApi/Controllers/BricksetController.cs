using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyBrickset.Data.Repositories;
using MyBrickset.Data.Constant;

namespace MyBrickset.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class BricksetController : Controller
    {
        private readonly IBricksetRepository _bricksetRepo;
        public BricksetController(IBricksetRepository bricksetRepo)
        {
            _bricksetRepo = bricksetRepo;
        }

        [Route("themes")]
        public IActionResult GetThemes()
        {
            var themes =(_bricksetRepo.GetThemesAsync().Result);
            if (themes == null)
            {
                return NotFound();
            }
            return new ObjectResult(themes);
        }

        [Route("subthemes")]
        public IActionResult GetSubthemesWithYears(string theme)
        {
            var subthemes = (_bricksetRepo.GetSubthemesAndYears(theme).Result);
            if (subthemes == null)
            {
                return NotFound();
            }
            return new ObjectResult(subthemes);
        }

        [Route("sets")]
        public IActionResult GetSets(string theme, string subtheme, string year)
        {
            var sets = (_bricksetRepo.GetSetsAsync(theme, subtheme, year).Result);
            if (sets == null)
            {
                return NotFound();
            }
            return new ObjectResult(sets);
        }

        [Route("sets")]
        public IActionResult GetSet(string setId)
        {
            var set = (_bricksetRepo.GetSetAsync(setId).Result);
            if (set == null)
            {
                return NotFound();
            }
            return new ObjectResult(set);
        }
    }
}
