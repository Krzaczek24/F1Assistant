namespace ApiMock.Models.DataContracts
{
    public class TeamRadioModel
    {
        public DateTime Date { get; set; }
        public int DriverNumber { get; set; }
        public int MeetingKey { get; set; }
        public string RecordingUrl { get; set; } = string.Empty;
        public int SessionKey { get; set; }
    }
}
