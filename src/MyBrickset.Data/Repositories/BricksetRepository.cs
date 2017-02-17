using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BricksetService;
using Microsoft.Extensions.Options;
using MyBrickset.Data.Config;
using MyBrickset.Data.Constant;

namespace MyBrickset.Data.Repositories
{
    public class BricksetRepository : IBricksetRepository
    {
        private readonly BricksetAPIv2Soap _service;
        private readonly BricksetConfig _config;
        public BricksetRepository(BricksetAPIv2Soap service, IOptions<BricksetConfig> config)
        {
            _service = service;
            _config = config.Value;
        }

        public async Task<List<themes>> GetThemesAsync()
        {
            var themesResponse = await _service.getThemesAsync(new getThemesRequest()
            {
                Body = new getThemesRequestBody()
                {
                    apiKey = _config.ApiKey
                }
            });

            return themesResponse.Body.getThemesResult.ToList();
        }

        public async Task<List<subthemes>> GetSubthemesAsync(string theme)
        {
            var subthemesResponse = await _service.getSubthemesAsync(new getSubthemesRequest()
            {
                Body = new getSubthemesRequestBody()
                {
                    apiKey = _config.ApiKey,
                    theme = theme
                }
            });

            return subthemesResponse.Body.getSubthemesResult.ToList();
        }

        public async Task<List<years>> GetYearsAsync(string theme)
        {
            var yearsResponse = await _service.getYearsAsync(new getYearsRequest()
            {
                Body = new getYearsRequestBody()
                {
                    apiKey = _config.ApiKey,
                    theme = theme
                }
            });

            return yearsResponse?.Body?.getYearsResult?.ToList();
        }

        public async Task<object> GetSubthemesAndYears(string theme)
        {
            var years = await GetYearsAsync(theme);
            var subthemes = await GetSubthemesAsync(theme);
            return new {years = years, subthemes = subthemes};
        }

        public async Task<List<sets>> GetSetsAsync(string theme, string subtheme, string year)
        {
            return
                await GetSetsAsync(theme, subtheme, year, SetOrderBy.Name, _config.PageSize.ToString(),_config.PageNumber.ToString());
        }

        public async Task<List<sets>> GetSetsAsync(string theme, string subtheme, string year, string orderBy, string pageSize,
            string pageNumber)
        {
            return
                await GetSetsAsync(string.Empty, theme, subtheme, string.Empty, year, string.Empty, string.Empty, orderBy,
                        pageSize, pageNumber, string.Empty, string.Empty);
        }
        public async Task<List<sets>> GetSetsAsync(string query, string theme, string subtheme, string setNumber, string year, string owned,
            string wanted, string orderBy, string pageSize, string pageNumber, string userName,string userHash)
        {
            var setsResponse = await _service.getSetsAsync(new getSetsRequest()
            {
                Body = new getSetsRequestBody()
                {
                    apiKey = _config.ApiKey,
                    query = query,
                    theme = theme,
                    subtheme = subtheme,
                    setNumber = setNumber,
                    year = year,
                    owned = owned,
                    wanted = wanted,
                    orderBy = orderBy,
                    pageSize = pageSize,
                    pageNumber = pageNumber,
                    userName = userName,
                    userHash = userHash
                }
            });

            return setsResponse.Body.getSetsResult.ToList();
        }

        public async Task<sets> GetSetAsync(string setId)
        {
            var setResponse = await _service.getSetAsync(new getSetRequest()
            {
                Body = new getSetRequestBody()
                {
                    apiKey = _config.ApiKey,
                    SetID = setId
                }
            });

            return setResponse.Body.getSetResult.FirstOrDefault();
        }

        public async Task<List<reviews>> GetReviewsAsync(int setId)
        {
            var reviewsResponse = await _service.getReviewsAsync(new getReviewsRequest()
            {
                Body = new getReviewsRequestBody()
                {
                    apiKey = _config.ApiKey,
                    setID = setId
                }
            });

            return reviewsResponse.Body.getReviewsResult.ToList();
        }

        public async Task<List<instructions>> GetInstructionsAsync(int setId)
        {
            var instructionsResponse = await _service.getInstructionsAsync(new getInstructionsRequest()
            {
                Body = new getInstructionsRequestBody()
                {
                    apiKey = _config.ApiKey,
                    setID = setId
                }
            });

            return instructionsResponse.Body.getInstructionsResult.ToList();
        }

        public async Task<List<additionalImages>> GetAdditionalImagesAsync(int setId)
        {
            var imagesResponse = await _service.getAdditionalImagesAsync(new getAdditionalImagesRequest()
            {
                Body = new getAdditionalImagesRequestBody()
                {
                    apiKey = _config.ApiKey,
                    setID = setId
                }
            });

            return imagesResponse.Body.getAdditionalImagesResult.ToList();
        }

        public async Task<List<sets>> GetRecentlyUpdatedSetsAsync(int minutesAgo)
        {
            var recentlyUpdatedSetsResponse = await _service.getRecentlyUpdatedSetsAsync(new getRecentlyUpdatedSetsRequest()
            {
                Body = new getRecentlyUpdatedSetsRequestBody()
                {
                    apiKey = _config.ApiKey,
                    minutesAgo = minutesAgo
                }
            });

            return recentlyUpdatedSetsResponse.Body.getRecentlyUpdatedSetsResult.ToList();
        }

        public async Task<List<minifigCollection>> GetMinifigCollectionAsync(string query, string owned, string wanted, string userHash)
        {
            var minifigCollectionResponse = await _service.getMinifigCollectionAsync(new getMinifigCollectionRequest()
            {
                Body = new getMinifigCollectionRequestBody()
                {
                    apiKey = _config.ApiKey,
                    query = query,
                    owned = owned,
                    wanted = wanted,
                    userHash = userHash
                }
            });

            return minifigCollectionResponse.Body.getMinifigCollectionResult.ToList();
        }
    }
}