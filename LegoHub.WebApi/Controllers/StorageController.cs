using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using LegoHub.Data.Config;
using LegoHub.Data.Models;
using LegoHub.Data.Storage;
using Newtonsoft.Json;
using LegoHub.Data.Helper;

namespace LegoHub.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class StorageController : Controller
    {
        private readonly StorageConfig _config;
        private readonly IConfigs<YoutubeConfig> _youtubeConfig;
        private readonly IConfigs<PinterestConfig> _pinterestConfig;
        private readonly IFileProcessor _fileProcessor;
        private IStringSerializer _serializer;
        public StorageController(
            IFileProcessor fileProcessor,
            IOptions<StorageConfig> config,
            IConfigs<YoutubeConfig> youtubeConfig,
            IConfigs<PinterestConfig> pinterestConfig,
            IStringSerializer serializer)
        {
            _config = config.Value;
            _fileProcessor = fileProcessor;
            _youtubeConfig = youtubeConfig;
            _pinterestConfig = pinterestConfig;
            _serializer = serializer;
        }

        [Route("configs")]
        public IActionResult GetAllConfigs()
        {
            var pinterestConfig = _pinterestConfig.Value ?? new PinterestConfig();
            pinterestConfig.Keywords = _fileProcessor.GetAllFileNamesFromFolderInAppRoot(_config.PinterestBoardsFolder);
            
            return new ObjectResult(new
            {
                YoutubeConfig = _youtubeConfig.Value ?? new YoutubeConfig(),
                PinterestConfig = _pinterestConfig.Value ?? new PinterestConfig(),
            });
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

        [Route("save-pinterest-boards")]
        [HttpPost]
        public IActionResult SavePinterestBoards(List<IFormFile> files)
        {
            if (files == null) throw new Exception("File is null");
            if (files.Count == 0) throw new Exception("File is empty");

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    var boards = new List<PinterestBoard>();
                    using (var stream = formFile.OpenReadStream())
                    {
                        using (var reader = new StreamReader(stream))
                        {
                            while (!reader.EndOfStream)
                            {
                                var line = reader.ReadLine();
                                var values = GetFieldsOfCsvRow(line, ",");
                                if (values.Length >= 3)
                                {
                                    var href = GetBoardHref(values[0]);
                                    if (!string.IsNullOrEmpty(href))
                                    {
                                        boards.Add(new PinterestBoard
                                        {
                                            Href = href,
                                            Title = values[1],
                                            Description = values[2]
                                        });
                                    }
                                }
                            }
                        }
                    }

                    string fileName = $"{Path.GetFileNameWithoutExtension(formFile.FileName)}.json";
                    _fileProcessor.SaveJsonToAppFolder(_config.PinterestBoardsFolder, fileName, _serializer.Serialize(boards));
                }

            }

            return new ObjectResult(new
            {
                count = files.Count,
                message = "Upload pinterest boards success!"
            });
        }

        private string[] GetFieldsOfCsvRow(string csvRow, string delimiter)
        {
            var lstFields = new List<string>();
            var field = "";
            var quoteStarted = false;
            for (int i = 0; i < csvRow.Length; i++)
            {
                var tmp = csvRow[i].ToString();
                if (string.Compare(tmp, "\"") == 0)
                {
                    quoteStarted = !quoteStarted;
                }
                if (string.Compare(tmp, delimiter) == 0 && !quoteStarted)
                {
                    lstFields.Add(field);
                    field = "";
                }
                else if (string.Compare(tmp, "\"") != 0)
                {
                    field += tmp;
                }
            }
            if (!string.IsNullOrEmpty(field))
            {
                lstFields.Add(field);
                field = "";
            }
            // This will hold values for each column for current row under processing
            return lstFields.ToArray();
        }

        private string GetBoardHref(string url)
        {
            if (Uri.IsWellFormedUriString(url, UriKind.Absolute))
            {
                var pinterestUrl = new Uri(url);
                if (pinterestUrl.Segments.Length == 3)
                {
                    return pinterestUrl.AbsolutePath;
                }

            }
            return string.Empty;
        }

        [Route("load-categories")]
        public IActionResult LoadCategoriesWithTeaserImage()
        {
            var categories = _fileProcessor.LoadObjectFromAppFolder<object>(string.Empty, _config.CategoryFile);
            if (categories != null)
            {
                return new ObjectResult(categories);
            }
            return new ObjectResult(new List<BricksetService.themes>());
        }

        [Route("get-boards")]
        public PinterestBoard[] GetPinterestBoards(string keyword)
        {
            var boards = _fileProcessor.LoadObjectFromAppFolder<PinterestBoard[]>(_config.PinterestBoardsFolder, $"{keyword}.json");
            return boards != null ? boards.Select(b => new PinterestBoard { Href = b.Href }).ToArray() : new PinterestBoard[0];
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
