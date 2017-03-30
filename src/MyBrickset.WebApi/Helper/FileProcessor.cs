using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace MyBrickset.WebApi.Helper
{
    public class FileProcessor : IFileProcessor
    {
        private IHostingEnvironment hostingEnvironment;
        public FileProcessor(IHostingEnvironment env)
        {
            hostingEnvironment = env;
        }

        public void SaveJsonToAppFolder(string appVirtualFolderPath, string fileName, string jsonContent)
        {
            var pathToFile = Path.Combine(hostingEnvironment.ContentRootPath, appVirtualFolderPath, fileName);

            using (StreamWriter s = File.CreateText(pathToFile))
            {
                s.Write(jsonContent);
            }
        }

        public void SaveJsonToWwwFolder(string virtualFolderPath, string fileName, string jsonContent)
        {
            var pathToFile = Path.Combine(hostingEnvironment.WebRootPath, virtualFolderPath, fileName);

            using (StreamWriter s = File.CreateText(pathToFile))
            {
                s.Write(jsonContent);
            }
        }
    }
}