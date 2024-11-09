namespace ApiMock.Models
{
    public abstract class Operator
    {
        public abstract bool Compute<T>(T objA, T objB) where T : IComparable<T>;

        public static Operator FromChars(string chars) => chars switch
        {
            "=" => Equals,
            "<" => LesserThan,
            ">" => GreaterThan,
            "<=" => LesserThanOrEqual,
            ">=" => GreaterThanOrEqual,
            _ => throw new InvalidOperationException()
        };

        public static new Operator Equals { get; } = new EqualsOperator();
        public static Operator LesserThan { get; } = new LesserThanOperator();
        public static Operator LesserThanOrEqual { get; } = new LesserThanOrEqualOperator();
        public static Operator GreaterThan { get; } = new GreaterThanOperator();
        public static Operator GreaterThanOrEqual { get; } = new GreaterThanOrEqualOperator();

        private class EqualsOperator : Operator
        {
            public override bool Compute<T>(T objA, T objB) => objA.CompareTo(objB) == 0;
        }

        private class LesserThanOperator : Operator
        {
            public override bool Compute<T>(T objA, T objB) => objA.CompareTo(objB) == -1;
        }

        private class GreaterThanOperator : Operator
        {
            public override bool Compute<T>(T objA, T objB) => objA.CompareTo(objB) == 1;
        }

        private class LesserThanOrEqualOperator : Operator
        {
            public override bool Compute<T>(T objA, T objB) => objA.CompareTo(objB) < 1;
        }

        private class GreaterThanOrEqualOperator : Operator
        {
            public override bool Compute<T>(T objA, T objB) => objA.CompareTo(objB) > -1;
        }
    }
}
