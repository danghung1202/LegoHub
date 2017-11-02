namespace LegoHub.Data.Config
{
    public interface IConfigs<T> where T : class
    {
        T Value {get;}
        void ResolveValue();
    }
}