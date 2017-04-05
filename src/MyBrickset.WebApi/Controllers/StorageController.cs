using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MyBrickset.Data.Config;
using MyBrickset.WebApi.Helper;

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
        public IActionResult SaveThemesWithTeaserImage([FromBody] string jsonContent)
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
    }
}
