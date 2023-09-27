using Calculator.Services;
using CalculatorTest.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;


namespace CalculatorTest.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalculatorController : ControllerBase
    {
        readonly ISimpleCalculator _calculator;
        public CalculatorController(ISimpleCalculator calculator)
        {
            _calculator = calculator;
        }

        [HttpPost("calc/")]
        public ActionResult<CalculatorViewModel> Calculator([FromBody] CalculatorViewModel model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            try
            {
                switch (model.Operation)
                {
                    case ("-"):
                        model.Result = _calculator.Subtract(model.Value1, model.Value2);
                        break;
                    case ("+"):
                        model.Result = _calculator.Add(model.Value1, model.Value2);
                        break;
                    case ("*"):
                        model.Result = _calculator.Multiplication(model.Value1, model.Value2);
                        break;
                    case ("/"):
                        model.Result = _calculator.Divide(model.Value1, model.Value2);
                        break;
                    default:
                        break;
                }

                return Ok(model);
            } 
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
