using ApiMock.Models;
using ApiMock.Settings;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Primitives;
using System.Text.RegularExpressions;
using System.Web;

namespace ApiMock.Middlewares
{
    public partial class RewriteMiddleware(RequestDelegate next)
    {
        private const string GUID = "guid";

        public async Task Invoke(HttpContext context)
        {
            var parameters = ExtractParams(context.Request.QueryString);
            string guid = Guid.NewGuid().ToString();

            Cache.Instance.Set(guid, parameters);

            context.Request.Query = new QueryCollection(new Dictionary<string, StringValues> { [GUID] = guid });
            context.Request.QueryString = new($"?{GUID}={guid}");

            await next(context);
        }

        private static QueryParam[] ExtractParams(QueryString rawQuery)
        {
            var parameters = new List<QueryParam>();

            string query = HttpUtility.UrlDecode(rawQuery.ToString()).TrimStart('?');
            var rawParameters = query.Split('&');
            foreach (string parameter in rawParameters)
            {
                var match = ParamRegex().Match(parameter);
                string key = match.Groups[1].Value;
                string @operator = match.Groups[2].Value;
                string value = match.Groups[3].Value;
                parameters.Add(new QueryParam(key, value, @operator));
            }

            return [..parameters];
        }

        [GeneratedRegex(@"^(\w+)([<>=]{1,2})(.+)$")]
        private static partial Regex ParamRegex();
    }

    public static class RewriteMiddlewareExtension
    {
        public static IApplicationBuilder UseRewriteMiddleware(this IApplicationBuilder appBuilder)
        {
            return appBuilder.UseMiddleware<RewriteMiddleware>();
        }
    }
}
