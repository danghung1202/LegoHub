using System.IO;
using LegoHub.Data.Helper;

namespace LegoHub.Data.Storage
{
    public class FileProcessor : IFileProcessor
    {
        private IStoragePathResolver _pathResolver;
        private IStringSerializer _serializer;
        public FileProcessor(IStoragePathResolver pathResolver, IStringSerializer serializer)
        {
            _pathResolver = pathResolver;
            _serializer = serializer;
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

        public dynamic LoadObjectFromAppFolder(string virtualFolderPath, string fileName){
            var pathToFile = _pathResolver.ResolveAppRootPath(virtualFolderPath, fileName);
            return LoadObject(pathToFile);
        }

        public dynamic LoadObjectFromWwwFolder(string virtualFolderPath, string fileName){
            var pathToFile = _pathResolver.ResolveWwwRootPath(virtualFolderPath, fileName);
            return LoadObject(pathToFile);
        }

        private dynamic LoadObject(string pathToFile){
            if (!File.Exists(pathToFile)) return null;

            using (StreamReader reader = File.OpenText(pathToFile))
            {
                var payload = reader.ReadToEnd();
                var result = _serializer.Deserialize(payload);
                return result;
            }
        }
    }
}