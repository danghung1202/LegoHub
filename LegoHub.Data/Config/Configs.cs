using Newtonsoft.Json;
using System;
using LegoHub.Data.Storage;
using System.IO;
using LegoHub.Data.Helper;

namespace LegoHub.Data.Config
{
    public class Configs<T> : IConfigs<T> where T : class
    {
        private IStoragePathResolver _pathResolver;
        private IStringSerializer _serializer;
        private T _value;
        public T Value => _value;

        public Configs(IStoragePathResolver pathResolver, IStringSerializer serializer)
        {
            _pathResolver = pathResolver;
            _serializer = serializer;

            ResolveValue();
        }

        public void ResolveValue()
        {
            string fileName = $"{typeof(T).Name}.json";
            var pathToFile = _pathResolver.ResolveAppRootPath(string.Empty, fileName);
            if (File.Exists(pathToFile))
            {
                using (StreamReader reader = File.OpenText(pathToFile))
                {
                    var payload = reader.ReadToEnd();
                    _value = _serializer.Deserialize<T>(payload);
                }
            }
        }

    }
}
