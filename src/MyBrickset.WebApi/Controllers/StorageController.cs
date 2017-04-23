using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IConfigs<YoutubeConfig> _youtubeConfig;
        private readonly IFileProcessor _fileProcessor;
        public StorageController(IFileProcessor fileProcessor, IOptions<StorageConfig> config, IConfigs<YoutubeConfig> youtubeConfig)
        {
            _config = config.Value;
            _fileProcessor = fileProcessor;
            _youtubeConfig = youtubeConfig;
        }

        [Authorize(Roles = "Administrator")]
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

        [Authorize(Roles = "Administrator")]
        [Route("save-youtube-settings")]
        [HttpPost]
        public IActionResult SaveYoutubeSettings(string jsonContent)
        {
            if (string.IsNullOrEmpty(jsonContent))
            {
                return BadRequest();
            }
            string fileName = $"{typeof(YoutubeConfig).Name}.json";
            _fileProcessor.SaveJsonToAppFolder(string.Empty, fileName, jsonContent);
            _youtubeConfig.ResolveValue();

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

        [Route("configs")]
        public IActionResult GetAllConfigs()
        {
            return new ObjectResult(new {
                YoutubeConfig = _youtubeConfig.Value ?? new YoutubeConfig()
            });
        }



    }
}
