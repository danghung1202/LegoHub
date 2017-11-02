using Newtonsoft.Json;
using System;

namespace LegoHub.Data.Helper
{
    public class StringSerializer : IStringSerializer
    {
        public string ExpectedFileExtension { get; } = ".json";

        public string Serialize(dynamic obj)
        {
            return JsonConvert.SerializeObject(
                    obj,
                    Formatting.None,
                    new JsonSerializerSettings
                    {
                        DefaultValueHandling = DefaultValueHandling.Include
                    }
                );
        }

        public T Deserialize<T>(string serializedObject)
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
