using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BricksetService;

namespace MyBrickset.Data.Repositories
{
    public interface IBricksetRepository
    {
        Task<List<themes>> GetThemesAsync();
        List<subthemes> GetSubthemesAsync(string theme);
        List<years> GetYearsAsync(string theme);
        List<sets> GetSetsAsync(string query, string theme, string subtheme, string setNumber, string year, string owned, string wanted,
            string orderBy, string pageSize, string pageNumber, string userName);
        sets GetSetAsync(int setId);
        List<reviews> GetReviewsAsync(int setId);
        List<instructions> GetInstructionsAsync(int setId);
        List<additionalImages> GetAdditionalImagesAsync(int setId);
    }

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

        public List<subthemes> GetSubthemesAsync(string theme)
        {
            throw new NotImplementedException();
        }

        public List<years> GetYearsAsync(string theme)
        {
            throw new NotImplementedException();
        }

        public List<sets> GetSetsAsync(string query, string theme, string subtheme, string setNumber, string year, string owned,
            string wanted, string orderBy, string pageSize, string pageNumber, string userName)
        {
            throw new NotImplementedException();
        }

        public sets GetSetAsync(int setId)
        {
            throw new NotImplementedException();
        }

        public List<reviews> GetReviewsAsync(int setId)
        {
            throw new NotImplementedException();
        }

        public List<instructions> GetInstructionsAsync(int setId)
        {
            throw new NotImplementedException();
        }

        public List<additionalImages> GetAdditionalImagesAsync(int setId)
        {
            throw new NotImplementedException();
        }
    }
}
