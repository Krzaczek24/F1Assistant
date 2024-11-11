using ApiMock.Attributes;
using ApiMock.Settings;
using KrzaqTools.Extensions;
using Microsoft.Extensions.Caching.Memory;
using System.Collections;
using System.Data;
using System.Reflection;
using System.Text.Json;

namespace ApiMock.Services
{
    public interface IDataService
    {
        IReadOnlyCollection<T> GetDataSet<T>();
        IReadOnlyDictionary<string, object> GetLatestsOf<T>();
    }

    public class DataService(IMemoryCache cache) : IDataService
    {
        private readonly static JsonSerializerOptions JsonOpts = new() { PropertyNamingPolicy = new SnakeCasePropertyNamingPolicy() };
        private readonly static MemoryCacheEntryOptions CacheEntryOpts = new() { Priority = CacheItemPriority.NeverRemove };

        public IReadOnlyCollection<T> GetDataSet<T>() => GetFromCache<T, IReadOnlyCollection<T>>("DATA_SETS_KEY", LoadDataSetFromFile<T>);

        public IReadOnlyDictionary<string, object> GetLatestsOf<T>() => GetFromCache<T, IReadOnlyDictionary<string, object>>("LATESTS_KEY", ComputeLatestsOf<T>);

        private TEnumerable GetFromCache<TModel, TEnumerable>(string key, Func<TEnumerable> retriever) where TEnumerable : IEnumerable
        {
            if (!cache.TryGetValue(key, out Dictionary<Type, TEnumerable>? dict) || dict == null)
            {
                cache.Set(key, dict = [], CacheEntryOpts);
            }

            if (!dict.TryGetValue(typeof(TModel), out TEnumerable? result) || result.IsNullOrEmpty())
            {
                dict[typeof(TModel)] = result = retriever();
                cache.Set(key, dict, CacheEntryOpts);
            }

            return result!;
        }

        private static IReadOnlyCollection<T> LoadDataSetFromFile<T>()
        {
            const string dirname = "DataSets";
            string filename = typeof(T).Name.Replace("Model", "DataSet.json");

            var baseDir = new DirectoryInfo(AppDomain.CurrentDomain.BaseDirectory);
            var dataSetsDir = baseDir.GetDirectories(dirname, SearchOption.TopDirectoryOnly).FirstOrDefault() ?? throw new DirectoryNotFoundException($"Directory [{dirname}] has been not found");
            var file = dataSetsDir.GetFiles(filename, SearchOption.TopDirectoryOnly).FirstOrDefault() ?? throw new FileNotFoundException($"File [{filename}] has been not found");

            string json = File.ReadAllText(file.FullName);
            var result = JsonSerializer.Deserialize<IReadOnlyCollection<T>>(json, JsonOpts)!;
            return result;
        }

        private IReadOnlyDictionary<string, object> ComputeLatestsOf<T>()
        {
            var dataSet = GetDataSet<T>();
            var props = typeof(T).GetProperties().Where(prop => prop.IsFilterable());
            var latests = props.ToDictionary(ParsePropName, GetPropValueOfLatest).AsReadOnly();
            return latests;

            static string ParsePropName(PropertyInfo prop) => prop.Name.ToSnakeCase();
            object GetPropValueOfLatest(PropertyInfo prop) => dataSet.Select(x => prop.GetValue(x)).Max()!;
        }
    }
}
