using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BricksetService;

namespace MyBrickset.Data.Repositories
{
    public class BricksetRepository : IBricksetRepository
    {
        private readonly BricksetAPIv2Soap _service;
        private const string APIKEY = "D8uJ-7wDP-54pZ";
        public BricksetRepository(BricksetAPIv2Soap service)
        {
            _service = service;
        }

        public async Task<List<themes>> GetThemesAsync()
        {
            var themesResponse = await _service.getThemesAsync(new getThemesRequest()
            {
                Body = new getThemesRequestBody()
                {
                    apiKey = APIKEY
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
                    apiKey = APIKEY,
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
                    apiKey = APIKEY,
                    theme = theme
                }
            });

            return yearsResponse.Body.getYearsResult.ToList();
        }

        public async Task<List<sets>> GetSetsAsync(string query, string theme, string subtheme, string setNumber, string year, string owned,
            string wanted, string orderBy, string pageSize, string pageNumber, string userName,string userHash)
        {
            var setsResponse = await _service.getSetsAsync(new getSetsRequest()
            {
                Body = new getSetsRequestBody()
                {
                    apiKey = APIKEY,
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
                    apiKey = APIKEY,
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
                    apiKey = APIKEY,
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
                    apiKey = APIKEY,
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
                    apiKey = APIKEY,
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
                    apiKey = APIKEY,
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
                    apiKey = APIKEY,
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