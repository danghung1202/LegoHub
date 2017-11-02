namespace LegoHub.Data.Helper
{
    public interface IStringSerializer
    {
        string Serialize(dynamic obj);
        T Deserialize<T>(string serializedObject);
        string ExpectedFileExtension { get; }
    }
}