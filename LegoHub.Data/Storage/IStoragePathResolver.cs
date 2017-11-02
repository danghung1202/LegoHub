namespace LegoHub.Data.Storage
{
    public interface IStoragePathResolver
    {
        StoragePath Value { get; }
        string ResolveAppRootPath(string folderPaths, string fileNameWithExtension);
        string ResolveWwwRootPath(string folderPaths, string fileNameWithExtension);
    }
}