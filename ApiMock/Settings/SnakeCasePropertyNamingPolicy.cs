using KrzaqTools.Extensions;
using System.Text.Json;

namespace ApiMock.Settings
{
    public class SnakeCasePropertyNamingPolicy : JsonNamingPolicy
    {
        public override string ConvertName(string name) => name.ToSnakeCase();
    }
}
