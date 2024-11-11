using ApiMock.Attributes;

namespace ApiMock.Models.DataContracts
{
    public class TeamRadioModel
    {
        [Filterable]
        public DateTime Date { get; set; }

        [Filterable]
        public int DriverNumber { get; set; }

        [Filterable]
        public int MeetingKey { get; set; }

        public string RecordingUrl { get; set; } = string.Empty;

        [Filterable]
        public int SessionKey { get; set; }
    }
}
