using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using LegoHub.Data.Config;
using LegoHub.Data.Models;
using LegoHub.Data.Storage;
using Newtonsoft.Json;

namespace LegoHub.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class StorageController : Controller
    {
        private readonly StorageConfig _config;
        private readonly IConfigs<YoutubeConfig> _youtubeConfig;
        private readonly IConfigs<PinterestConfig> _pinterestConfig;
        private readonly IFileProcessor _fileProcessor;
        public StorageController(
            IFileProcessor fileProcessor,
            IOptions<StorageConfig> config,
            IConfigs<YoutubeConfig> youtubeConfig,
            IConfigs<PinterestConfig> pinterestConfig)
        {
            _config = config.Value;
            _fileProcessor = fileProcessor;
            _youtubeConfig = youtubeConfig;
            _pinterestConfig = pinterestConfig;
        }

        [Authorize(Roles = "Administrator")]
        [Route("save-categories")]
        [HttpPost]
        public IActionResult SaveCategoriesWithTeaserImage([FromBody] SettingRequest request)
        {
            if (string.IsNullOrEmpty(request?.jsonContent))
            {
                return BadRequest();
            }

            _fileProcessor.SaveJsonToAppFolder(string.Empty, _config.CategoryFile, request.jsonContent);
            return new ObjectResult(new
            {
                success = true,
                message = "Save category settings success!"
            });
        }

        [Authorize(Roles = "Administrator")]
        [Route("save-youtube-settings")]
        [HttpPost]
        public IActionResult SaveYoutubeSettings([FromBody] SettingRequest request)
        {
            if (string.IsNullOrEmpty(request?.jsonContent))
            {
                return BadRequest();
            }
            string fileName = $"{typeof(YoutubeConfig).Name}.json";
            _fileProcessor.SaveJsonToAppFolder(string.Empty, fileName, request.jsonContent);
            _youtubeConfig.ResolveValue();

            return new ObjectResult(new
            {
                success = true,
                message = "Save youtube settings success!"
            });
        }

        [Authorize(Roles = "Administrator")]
        [Route("save-pinterest-settings")]
        [HttpPost]
        public IActionResult SavePinterestSettings([FromBody] SettingRequest request)
        {
            if (string.IsNullOrEmpty(request?.jsonContent))
            {
                return BadRequest();
            }
            string fileName = $"{typeof(PinterestConfig).Name}.json";
            _fileProcessor.SaveJsonToAppFolder(string.Empty, fileName, request.jsonContent);
            _pinterestConfig.ResolveValue();

            return new ObjectResult(new
            {
                success = true,
                message = "Save pinterest settings success!"
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
            return new ObjectResult(new
            {
                YoutubeConfig = _youtubeConfig.Value ?? new YoutubeConfig(),
                PinterestConfig = _pinterestConfig.Value ?? new PinterestConfig()
            });
        }

        [Route("fetch-boards")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> FetchBoards(string username)
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri("http://pinterestapi.co.uk");
                    var response = await client.GetAsync($"/{username}/boards");
                    response.EnsureSuccessStatusCode(); // Throw in not success

                    var stringResponse = await response.Content.ReadAsStringAsync();
                    var boardResponse = JsonConvert.DeserializeObject<BoardResponse>(stringResponse);

                    return new ObjectResult(new
                    {
                        boards = boardResponse.Body
                    });
                }
                catch (HttpRequestException e)
                {
                    Console.WriteLine($"Request exception: {e.Message}");
                    return new ObjectResult(new
                    {
                        response = e.Message
                    });
                }
            }
        }

    }
}
