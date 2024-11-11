using ApiMock.Base;
using ApiMock.Models;
using ApiMock.Models.DataContracts;
using ApiMock.Services;

namespace ApiMock.Controllers
{
    public class TeamRadioController(IDataService dataService) : BaseController<TeamRadioModel>(dataService)
    {
        protected override Func<TeamRadioModel, bool> FilterHandler(QueryParam param)
        {
            var @operator = Operator.FromChars(param.Operator);
            return param.Key switch
            {
                "date" => x => @operator.Compute(x.Date, GetParamValue(param, DateTime.Parse)),
                "driver_number" => x => @operator.Compute(x.DriverNumber, GetParamValue(param, int.Parse)),
                "meeting_key" => x => @operator.Compute(x.MeetingKey, GetParamValue(param, int.Parse)),
                "session_key" => x => @operator.Compute(x.SessionKey, GetParamValue(param, int.Parse)),
                _ => throw new NotImplementedException($"No filter implementation for parameter [{param.Key}]")
            };
        }
    }
}
