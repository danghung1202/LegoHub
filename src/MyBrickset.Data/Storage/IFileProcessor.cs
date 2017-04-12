namespace MyBrickset.Data.Storage
{
    public interface IFileProcessor
    {
        void SaveJsonToAppFolder(string virtualFolderPath, string fileName, string jsonContent);
        void SaveJsonToWwwFolder(string virtualFolderPath, string fileName, string jsonContent);
        dynamic LoadObjectFromAppFolder(string virtualFolderPath, string fileName);
        dynamic LoadObjectFromWwwFolder(string virtualFolderPath, string fileName);
    }
}