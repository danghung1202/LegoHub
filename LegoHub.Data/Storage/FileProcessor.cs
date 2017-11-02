using System.IO;
using System.Linq;
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

        public T LoadObjectFromAppFolder<T>(string virtualFolderPath, string fileName){
            var pathToFile = _pathResolver.ResolveAppRootPath(virtualFolderPath, fileName);
            return LoadObject<T>(pathToFile);
        }

        public T LoadObjectFromWwwFolder<T>(string virtualFolderPath, string fileName){
            var pathToFile = _pathResolver.ResolveWwwRootPath(virtualFolderPath, fileName);
            return LoadObject<T>(pathToFile);
        }

        public string[] GetAllFileNamesFromFolderInAppRoot(string folder){
            return Directory.GetFiles(_pathResolver.ResolveAppRootPath(folder, string.Empty), "*.json")
                                     .Select(Path.GetFileNameWithoutExtension)
                                     .ToArray();
        }

        private T LoadObject<T>(string pathToFile){
            if (!File.Exists(pathToFile)) return default(T);

            using (StreamReader reader = File.OpenText(pathToFile))
            {
                var payload = reader.ReadToEnd();
                var result = _serializer.Deserialize<T>(payload);
                return result;
            }
        }
    }
}