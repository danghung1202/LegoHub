﻿using System;
using System.Collections.Generic;
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
                return new ObjectResult(new List<BricksetService.themes>());
            }

            var themesThisYear = themes.Where(x => x.yearTo == thisYear && x.theme != "{Undefined}" && x.setCount > 0).OrderBy(x => x.theme).ToList();
            return new ObjectResult(themesThisYear);
        }

        [Route("subthemes")]
        public IActionResult GetSubthemesWithYears(string themes)
        {
            var subthemesWithYears = (_bricksetRepo.GetSubthemesAndYears(themes).Result);
            if (subthemesWithYears == null)
            {
                return new ObjectResult(new List<BricksetService.subthemes>());
            }
            return new ObjectResult(subthemesWithYears);
        }

        [Route("sets")]
        public IActionResult GetSets(string q, string themes, string subthemes, string years, string page, string order, string size)
        {
            var sets = (_bricksetRepo.GetSetsAsync(q, themes, subthemes, years, order, size, page).Result);
            if (sets == null)
            {
                return new ObjectResult(new List<BricksetService.sets>());
            }
            return new ObjectResult(sets);
        }

        [Route("set")]
        public IActionResult GetSet(string setId)
        {
            var set = (_bricksetRepo.GetSetAsync(setId).Result);
            int id = 0;
            var additionalImages = new List<BricksetService.additionalImages>();
            var instructions = new List<BricksetService.instructions>();

            if (int.TryParse(setId, out id))
            {
                additionalImages = (_bricksetRepo.GetAdditionalImagesAsync(id).Result);
                instructions = (_bricksetRepo.GetInstructionsAsync(id).Result);
            }

            if (set == null)
            {
                return new ObjectResult(new
                {
                    set = new BricksetService.sets(),
                    additionalImages = additionalImages,
                    instructions = instructions
                });
            }
            return new ObjectResult(new
            {
                set = set,
                additionalImages = additionalImages,
                instructions = instructions
            });
        }
    }
}
