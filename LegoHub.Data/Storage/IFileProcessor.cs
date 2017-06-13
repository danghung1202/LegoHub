namespace LegoHub.Data.Storage
{
    public interface IFileProcessor
    {
        void SaveJsonToAppFolder(string virtualFolderPath, string fileName, string jsonContent);
        void SaveJsonToWwwFolder(string virtualFolderPath, string fileName, string jsonContent);
        T LoadObjectFromAppFolder<T>(string virtualFolderPath, string fileName);
        T LoadObjectFromWwwFolder<T>(string virtualFolderPath, string fileName);
        string[] GetAllFileNamesFromFolderInAppRoot(string folder);
    }
}