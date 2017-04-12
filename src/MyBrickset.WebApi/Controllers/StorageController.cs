using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyBrickset.Data.Config;
using MyBrickset.Data.Storage;

namespace MyBrickset.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class StorageController : Controller
    {
        private readonly StorageConfig _config;
        private readonly IFileProcessor _fileProcessor;
        public StorageController(IFileProcessor fileProcessor, IOptions<StorageConfig> config)
        {
            _config = config.Value;
            _fileProcessor = fileProcessor;
        }

        [Route("save-categories")]
        [HttpPost]
        public IActionResult SaveCategoriesWithTeaserImage(string jsonContent)
        {
            if (string.IsNullOrEmpty(jsonContent))
            {
                return BadRequest();
            }

            _fileProcessor.SaveJsonToAppFolder(string.Empty, _config.CategoryFile, jsonContent);
            return new ObjectResult(new
            {
                success = true,
                message = "Success!"
            });
        }

        [Route("load-categories")]
        public IActionResult LoadCategoriesWithTeaserImage()
        {
            var categories = _fileProcessor.LoadObjectFromAppFolder(string.Empty, _config.CategoryFile);
            if (categories != null)
            {
                return new ObjectResult(categories);
            }
            return new ObjectResult(new List<BricksetService.themes>());
        }



    }
}
