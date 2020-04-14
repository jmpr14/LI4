using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ConsultaJa.Models;

namespace ConsultaJa.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors("ReactPolicy")]
    public class ContasController : ControllerBase
    {
        private readonly ContaService userService;

        public ContasController(ContaService userService)
        {
            this.userService = userService;
        }

        // GET api/contas
        [HttpGet]
        public IEnumerable<Conta> Get()
        {
            return userService.GetAll();
        }

        // GET api/contas/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(userService.GetById(id));
        }

        // POST api/contas
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Conta user)
        {
            return CreatedAtAction("Get", new { id = user.Id }, userService.Create(user));
        }

        // PUT api/contas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Conta user)
        {
            userService.Update(id, user);

            return NoContent();
        }

        // DELETE api/contas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            userService.Delete(id);

            return NoContent();
        }

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }

        // api/contas/login
        [HttpGet("{login}")]
        public ActionResult Login([FromQuery] string Email,
                                          [FromQuery] string Password)
        {
            bool val = this.userService.login(Email, Password);
            
            if (!val)
            {
                return Unauthorized();
            }
            else
            {
                return Ok();
            }
        }
    }
}







//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Logging;
//using ConsultaJa.Models;

//namespace ConsultaJa.Controllers
//{
//    [ApiController]
//    [Route("[controller]")]
//    public class ContaController : ControllerBase
//    {

//        private readonly ContaService contaService = new ContaService();

//        private readonly ILogger<ContaController> _logger;

//        public ContaController(ILogger<ContaController> logger)
//        {
//            _logger = logger;
//        }

//        [Route("Login")]
//        [HttpGet]
//        public ActionResult Login([FromQuery] string Username,
//                                  [FromQuery] string Password)
//        {
//            try
//            {
//                this.contaService.login(Username, Password);
//            }
//            catch (PasswordErrada e)
//            {
//                return Unauthorized();
//            }

//            return Ok();
//        }
//    }
//}
