using Newtonsoft.Json;
using System;
using MyBrickset.Data.Storage;
using System.IO;

namespace MyBrickset.Data.Config
{
    public class Configs<T> : IConfigs<T> where T : class
    {
        private IStoragePathResolver _pathResolver;
        private T _value;
        public T Value => _value;

        public Configs(IStoragePathResolver pathResolver)
        {
            _pathResolver = pathResolver;
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
                    _value = Deserialize(payload);
                }
            }
        }

        private T Deserialize(string serializedObject)
        {
            if (string.IsNullOrWhiteSpace(serializedObject)) throw new ArgumentException("must pass in a string");
            var settings = new JsonSerializerSettings
            {
                DefaultValueHandling = DefaultValueHandling.Include
            };
            return JsonConvert.DeserializeObject<T>(serializedObject, settings);
        }
    }
}
