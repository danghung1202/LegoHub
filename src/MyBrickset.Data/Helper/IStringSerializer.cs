namespace MyBrickset.Data.Helper
{
    public interface IStringSerializer
    {
        string Serialize(dynamic obj);
        dynamic Deserialize(string serializedObject);
        string ExpectedFileExtension { get; }
    }
}