namespace MyBrickset.WebApi.Helper
{
    public interface IFileProcessor
    {
        void SaveJsonToAppFolder(string appVirtualFolderPath, string fileName, string jsonContent);
        void SaveJsonToWwwFolder(string virtualFolderPath, string fileName, string jsonContent);
    }
}