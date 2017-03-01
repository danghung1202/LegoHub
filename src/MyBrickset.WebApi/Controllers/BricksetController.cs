using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MyBrickset.Data.Repositories;

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
            var themes = (_bricksetRepo.GetThemesAsync().Result);
            if (themes == null)
            {
                return NotFound();
            }
            return new ObjectResult(themes);
        }

        [Route("theme-nav")]
        public IActionResult GetThemesThisYear()
        {
            var thisYear = DateTime.Now.Year;
            var themes = (_bricksetRepo.GetThemesAsync().Result);
            if (themes == null)
            {
                return NotFound();
            }

            var themesThisYear = themes.Where(x => x.yearTo == thisYear && x.theme != "{Undefined}").OrderBy(x => x.theme).ToList();
            return new ObjectResult(themesThisYear);
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
        public IActionResult GetSets(string themes, string subthemes, string years)
        {
            var sets = (_bricksetRepo.GetSetsAsync(themes ?? string.Empty, subthemes ?? string.Empty, years ?? string.Empty).Result);
            if (sets == null)
            {
                return NotFound();
            }
            return new ObjectResult(sets);
        }

        [Route("set")]
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
