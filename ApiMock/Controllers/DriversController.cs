using ApiMock.Base;
using ApiMock.Models;
using ApiMock.Models.DataContracts;
using ApiMock.Services;

namespace ApiMock.Controllers
{
    public class DriversController(IDataService dataService) : BaseController<DriversModel>(dataService)
    {
        protected override Func<DriversModel, bool> FilterHandler(QueryParam param)
        {
            var @operator = Operator.FromChars(param.Operator);
            return param.Key switch
            {
                "broadcast_name" => x => @operator.Compute(x.BroadcastName, GetParamValue(param, x => x)),
                "country_name" => x => @operator.Compute(x.CountryCode, GetParamValue(param, x => x)),
                "driver_number" => x => @operator.Compute(x.DriverNumber, GetParamValue(param, int.Parse)),
                "first_name" => x => @operator.Compute(x.FirstName, GetParamValue(param, x => x)),
                "full_name" => x => @operator.Compute(x.FullName, GetParamValue(param, x => x)),
                "last_name" => x => @operator.Compute(x.LastName, GetParamValue(param, x => x)),
                "meeting_key" => x => @operator.Compute(x.MeetingKey, GetParamValue(param, int.Parse)),
                "name_acronym" => x => @operator.Compute(x.NameAcronym, GetParamValue(param, x => x)),
                "session_key" => x => @operator.Compute(x.SessionKey, GetParamValue(param, int.Parse)),
                "team_colour" => x => @operator.Compute(x.TeamColour, GetParamValue(param, x => x)),
                "team_name" => x => @operator.Compute(x.TeamName, GetParamValue(param, x => x)),
                _ => throw new NotImplementedException($"No filter implementation for parameter [{param.Key}]")
            };
        }
    }
}
