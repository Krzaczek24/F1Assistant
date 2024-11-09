using ApiMock.Base;
using ApiMock.Models;
using ApiMock.Models.DataContracts;
using Microsoft.AspNetCore.Mvc;
using System.Collections.ObjectModel;
using System.Text.Json;

namespace ApiMock.Controllers
{
    public class TeamRadioController : BaseController
    {
        private readonly static Lazy<IEnumerable<TeamRadioModel>> Data = new(() => JsonSerializer.Deserialize<TeamRadioModel[]>(RawData!, JsonOpts)!.AsEnumerable());

        protected override ReadOnlyDictionary<string, Lazy<object>> Latests { get; } = new Dictionary<string, Lazy<object>>()
        {
            ["meeting_key"] = new(() => Data.Value.Select(x => x.MeetingKey).Max()),
            ["session_key"] = new(() => Data.Value.Select(x => x.SessionKey).Max()),
        }.AsReadOnly();

        [HttpGet]
        public async Task<TeamRadioModel[]> Index([FromQuery] string guid)
        {
            var @params = GetQueryParams(guid);

            var result = Data.Value;

            foreach (var param in @params)
            {
                var @operator = Operator.FromChars(param.Operator);

                Func<TeamRadioModel, bool> filter = param.Key switch
                {
                    "date" => (x) => @operator.Compute(x.Date, GetParamValue(param, DateTime.Parse)),
                    "driver_number" => (x) => @operator.Compute(x.DriverNumber, GetParamValue(param, int.Parse)),
                    "meeting_key" => (x) => @operator.Compute(x.MeetingKey, GetParamValue(param, int.Parse)),
                    "session_key" => (x) => @operator.Compute(x.SessionKey, GetParamValue(param, int.Parse)),
                    "recording_url" => (x) => @operator.Compute(x.RecordingUrl, GetParamValue(param, x => x)),
                    _ => throw new NotImplementedException($"No filter implementation for parameter [{param.Key}]")
                };
                result = result.Where(filter);
            }

            return await Task.FromResult(result.ToArray());
        }

        private readonly static string RawData = "[{\"session_key\":9636,\"meeting_key\":1249,\"driver_number\":1,\"date\":\"2024-11-03T15:35:24.442000+00:00\",\"recording_url\":\"https://livetiming.formula1.com/static/2024/2024-11-03_São_Paulo_Grand_Prix/2024-11-03_Race/TeamRadio/MAXVER01_1_20241103_133438.mp3\"},{\"session_key\":9636,\"meeting_key\":1249,\"driver_number\":1,\"date\":\"2024-11-03T15:37:06.782000+00:00\",\"recording_url\":\"https://livetiming.formula1.com/static/2024/2024-11-03_São_Paulo_Grand_Prix/2024-11-03_Race/TeamRadio/MAXVER01_1_20241103_133633.mp3\"},{\"session_key\":9636,\"meeting_key\":1249,\"driver_number\":1,\"date\":\"2024-11-03T15:55:07.739000+00:00\",\"recording_url\":\"https://livetiming.formula1.com/static/2024/2024-11-03_São_Paulo_Grand_Prix/2024-11-03_Race/TeamRadio/MAXVER01_1_20241103_125441.mp3\"},{\"session_key\":9636,\"meeting_key\":1249,\"driver_number\":1,\"date\":\"2024-11-03T16:20:57.454000+00:00\",\"recording_url\":\"https://livetiming.formula1.com/static/2024/2024-11-03_São_Paulo_Grand_Prix/2024-11-03_Race/TeamRadio/MAXVER01_1_20241103_142036.mp3\"},{\"session_key\":9636,\"meeting_key\":1249,\"driver_number\":1,\"date\":\"2024-11-03T17:16:33.364000+00:00\",\"recording_url\":\"https://livetiming.formula1.com/static/2024/2024-11-03_São_Paulo_Grand_Prix/2024-11-03_Race/TeamRadio/MAXVER01_1_20241103_151615.mp3\"},{\"session_key\":9636,\"meeting_key\":1249,\"driver_number\":1,\"date\":\"2024-11-03T17:58:43.004000+00:00\",\"recording_url\":\"https://livetiming.formula1.com/static/2024/2024-11-03_São_Paulo_Grand_Prix/2024-11-03_Race/TeamRadio/MAXVER01_1_20241103_145756.mp3\"},{\"session_key\":9636,\"meeting_key\":1249,\"driver_number\":1,\"date\":\"2024-11-03T17:58:56.352000+00:00\",\"recording_url\":\"https://livetiming.formula1.com/static/2024/2024-11-03_São_Paulo_Grand_Prix/2024-11-03_Race/TeamRadio/MAXVER01_1_20241103_150316.mp3\"}]";
    }
}
