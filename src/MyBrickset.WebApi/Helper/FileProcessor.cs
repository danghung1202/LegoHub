using System.IO;
using MyBrickset.Data.Config;

namespace MyBrickset.WebApi.Helper
{
    public class FileProcessor : IFileProcessor
    {
        private IStoragePathResolver _pathResolver;
        public FileProcessor(IStoragePathResolver pathResolver)
        {
            _pathResolver = pathResolver;
        }

        public void SaveJsonToAppFolder(string virtualFolderPath, string fileName, string jsonContent)
        {
            var pathToFile = _pathResolver.ResolveAppRootPath(virtualFolderPath, fileName);

            using (StreamWriter s = File.CreateText(pathToFile))
            {
                s.Write(jsonContent);
            }
        }

        public void SaveJsonToWwwFolder(string virtualFolderPath, string fileName, string jsonContent)
        {
            var pathToFile = _pathResolver.ResolveWwwRootPath(virtualFolderPath, fileName);

            using (StreamWriter s = File.CreateText(pathToFile))
            {
                s.Write(jsonContent);
            }
        }
    }
}