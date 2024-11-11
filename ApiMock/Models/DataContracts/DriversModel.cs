using ApiMock.Attributes;

namespace ApiMock.Models.DataContracts
{
    public class DriversModel
    {
        [Filterable]
        public string BroadcastName { get; set; } = string.Empty;

        [Filterable]
        public string CountryCode { get; set; } = string.Empty;

        [Filterable]
        public int DriverNumber { get; set; }

        [Filterable]
        public string FirstName { get; set; } = string.Empty;

        [Filterable]
        public string FullName { get; set; } = string.Empty;

        public string HeadshotUrl { get; set; } = string.Empty;

        [Filterable]
        public string LastName { get; set; } = string.Empty;

        [Filterable]
        public int MeetingKey { get; set; }

        [Filterable]
        public string NameAcronym { get; set; } = string.Empty;

        [Filterable]
        public int SessionKey { get; set; }

        [Filterable]
        public string TeamColour { get; set; } = string.Empty;

        [Filterable]
        public string TeamName { get; set; } = string.Empty;
    }
}
