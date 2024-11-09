using KrzaqTools.Extensions;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace ApiMock.Settings
{
    public class SnakeCaseParameterTransformer : IOutboundParameterTransformer
    {
        public string? TransformOutbound(object? value) => value?.ToString()?.ToSnakeCase();
    }

    public static class SnakeCaseNamingPolicyExtension
    {
        public static void AddSnakeCaseNamingPolicy(this IList<IApplicationModelConvention> conventions)
        {
            conventions.Add(new RouteTokenTransformerConvention(new SnakeCaseParameterTransformer()));
        }
    }
}
