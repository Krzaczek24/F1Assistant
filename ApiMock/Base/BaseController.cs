using ApiMock.Models;
using ApiMock.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Collections.ObjectModel;
using System.Text.Json;

namespace ApiMock.Base
{
    [ApiController]
    [Route("[controller]")]
    public abstract class BaseController
    {
        private const string LATEST = "latest";

        protected readonly static JsonSerializerOptions JsonOpts = new() { PropertyNamingPolicy = new SnakeCasePropertyNamingPolicy() };

        protected abstract ReadOnlyDictionary<string, Lazy<object>> Latests { get; }

        protected static QueryParam[] GetQueryParams(string guid) => Cache.Instance.Get<QueryParam[]>(guid) ?? [];

        protected T GetParamValue<T>(QueryParam param, Func<string, T> parser)
        {
            if (param.Value != LATEST)
                return parser(param.Value);

            if (!Latests.TryGetValue(param.Key, out Lazy<object>? latest))
                throw new ArgumentException($"Unexpected '{LATEST}' value for parameter '{param.Key}'");

            return (T)latest.Value;
        }
    }
}
