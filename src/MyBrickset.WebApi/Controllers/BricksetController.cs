using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        [Route("getthemes")]
        public IActionResult GetThemes()
        {
            var themes =(_bricksetRepo.GetThemesAsync().Result);
            if (themes == null)
            {
                return NotFound();
            }
            return new ObjectResult(themes);
        }
    }
}
