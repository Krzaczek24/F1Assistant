namespace ApiMock.Models
{
    public abstract class Operator
    {
        public bool Compute(IComparable objA, object objB) => objA != null && IsConditionMet(objA.CompareTo(objB));
        protected abstract bool IsConditionMet(int compareResult);

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
            protected override bool IsConditionMet(int compareResult) => compareResult == 0;
        }

        private class LesserThanOperator : Operator
        {
            protected override bool IsConditionMet(int compareResult) => compareResult == -1;
        }

        private class GreaterThanOperator : Operator
        {
            protected override bool IsConditionMet(int compareResult) => compareResult == 1;
        }

        private class LesserThanOrEqualOperator : Operator
        {
            protected override bool IsConditionMet(int compareResult) => compareResult < 1;
        }

        private class GreaterThanOrEqualOperator : Operator
        {
            protected override bool IsConditionMet(int compareResult) => compareResult > -1;
        }
    }
}
