using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using LegoHub.Data.Config;

namespace LegoHub.Data.Storage
{
    public class StoragePathResolver : IStoragePathResolver
    {
        private IHostingEnvironment _hostingEnvironment;
        private StorageConfig _config;

        public StoragePathResolver(IHostingEnvironment env, IOptions<StorageConfig> config)
        {
            _hostingEnvironment = env;
            _config = config.Value;
        }
        public StoragePath Value => new StoragePath()
        {
            AppRootFolderPath = _hostingEnvironment.ContentRootPath,
            WwwRootFolderPath = _hostingEnvironment.WebRootPath,
            StorageFolderPath = _config.StorageFolderPath
        };

        public string ResolveAppRootPath(string folderPaths, string fileNameWithExtension)
        {
            var storageFolderPath = Path.Combine(Value.AppRootFolderPath, Value.StorageFolderPath);
            var parentFolderPath = !string.IsNullOrEmpty(folderPaths) ? Path.Combine(storageFolderPath, folderPaths) : storageFolderPath;

            return ResolvePath(parentFolderPath, fileNameWithExtension);
        }

        public string ResolveWwwRootPath(string folderPaths, string fileNameWithExtension)
        {
            var storageFolderPath = Path.Combine(Value.WwwRootFolderPath, Value.StorageFolderPath);
            var parentFolderPath = !string.IsNullOrEmpty(folderPaths) ? Path.Combine(storageFolderPath, folderPaths) : storageFolderPath;

            return ResolvePath(parentFolderPath, fileNameWithExtension);
        }

        private string ResolvePath(string folderPaths, string fileNameWithExtension)
        {
            if (!Directory.Exists(folderPaths))
            {
                Directory.CreateDirectory(folderPaths);
            }


            return string.IsNullOrEmpty(fileNameWithExtension) ? folderPaths : Path.Combine(folderPaths, fileNameWithExtension);
        }
    }
}