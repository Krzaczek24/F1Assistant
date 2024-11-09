using Microsoft.Extensions.Caching.Memory;

namespace ApiMock.Settings
{
    public static class Cache
    {
        public static MemoryCache Instance { get; } = new(new MemoryCacheOptions());
    }
}
