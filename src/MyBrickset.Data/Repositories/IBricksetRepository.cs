using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BricksetService;

namespace MyBrickset.Data.Repositories
{
    /// <summary>
    /// http://brickset.com/tools/webservices/v2
    /// </summary>
    public interface IBricksetRepository
    {
        Task<List<themes>> GetThemesAsync();
        Task<List<subthemes>> GetSubthemesAsync(string theme);
        Task<List<years>> GetYearsAsync(string theme);
        Task<List<sets>> GetSetsAsync(string query, string theme, string subtheme, string setNumber, string year, string owned, string wanted,
            string orderBy, string pageSize, string pageNumber, string userName, string userHash);
        Task<sets> GetSetAsync(string setId);
        Task<List<reviews>> GetReviewsAsync(int setId);
        Task<List<instructions>> GetInstructionsAsync(int setId);
        Task<List<additionalImages>> GetAdditionalImagesAsync(int setId);
        Task<List<sets>> GetRecentlyUpdatedSetsAsync(int minutesAgo);
        Task<List<minifigCollection>> GetMinifigCollectionAsync(string query, string owned, string wanted,
            string userHash);

    }
}
