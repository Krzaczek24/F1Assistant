using ApiMock.Models;
using ApiMock.Services;
using ApiMock.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace ApiMock.Base
{
    [ApiController]
    [Route("[controller]")]
    public abstract class BaseController<TModel>(IDataService dataService)
    {
        private const string LATEST = "latest";

        [HttpGet]
        public TModel[] Index([FromQuery] string guid)
        {
            var result = dataService.GetDataSet<TModel>().AsEnumerable();

            foreach (var param in GetQueryParams(guid))
            {
                result = result.Where(FilterHandler(param));
            }

            return result.ToArray();
        }

        protected abstract Func<TModel, bool> FilterHandler(QueryParam param);

        protected static QueryParam[] GetQueryParams(string guid) => Cache.Instance.Get<QueryParam[]>(guid) ?? [];

        protected TProperty GetParamValue<TProperty>(QueryParam param, Func<string, TProperty> parser)
        {
            if (param.Value != LATEST)
                return parser(param.Value);

            var latests = dataService.GetLatestsOf<TModel>();

            if (!latests.TryGetValue(param.Key, out object? latest))
                throw new ArgumentException($"Unexpected '{LATEST}' value for parameter '{param.Key}'");

            return (TProperty)latest;
        }
    }
}
