using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ConsultaJa.Models;

namespace ConsultaJa.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    [EnableCors("ReactPolicy")]
    public class ContasController : ControllerBase
    {
        private ConsultaJaModel model = ConsultaJaModel.Instance;

        private readonly ILogger<ContasController> _logger;

        public ContasController(ILogger<ContasController> logger)
        {
            _logger = logger;
        }

        // GET /contas
        [HttpGet]
        public IEnumerable<Conta> Get()
        {
            return model.GetAll();
        }

        // GET /contas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(model.GetById(id));
        }

        // POST /contas
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Conta user)
        {
            return CreatedAtAction("Get", new { id = user.Id }, model.Create(user));
        }

        // PUT /contas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Conta user)
        {
            model.Update(id, user);

            return NoContent();
        }

        // DELETE /contas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            model.Delete(id);

            return NoContent();
        }

        // /contas/login
        [HttpGet("login")]
        public ActionResult Get([FromQuery] string Email,
                                          [FromQuery] string Password)
        {
            try
            {
                bool val = this.model.login(Email, Password);
            }
            catch (PasswordErrada e)
            {
                return Unauthorized();
            }
            
            return Ok();

        }

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}





