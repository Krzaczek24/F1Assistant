using System.Reflection;

namespace ApiMock.Attributes
{
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
    public class FilterableAttribute : Attribute
    {

    }

    public static class FilterableAttributeExtension
    {
        public static bool IsFilterable(this MemberInfo memberInfo)
        {
            return memberInfo.GetCustomAttribute<FilterableAttribute>() != null;
        }
    }
}
