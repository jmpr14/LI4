using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ConsultaJa.Models;
using Newtonsoft.Json;
using System;
using ConsultaJa.Backend;
using ConsultaJa.Exceptions;

namespace ConsultaJa.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    [EnableCors("ReactPolicy")]
    public class ContasController : ControllerBase
    {
        private ConsultaJaModel model = new ConsultaJaModel();

        private readonly ILogger<ContasController> _logger;

        public ContasController(ILogger<ContasController> logger)
        {
            _logger = logger;
        }

        //GET /contas/P5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            Conta c = model.getConta(id);
            ContaModel cmodel = new ContaModel();
            cmodel.Type = (c.getID().Substring(0,1).CompareTo("P")==0) ? "Paciente" : "Medico";
            cmodel.Email = c.getEmail();
            cmodel.Nome = c.getNome();
            cmodel.DataNascimento = c.getDataNascimento().ToString().Substring(0,10);
            return Ok(cmodel);
        }

        /* POST /contas
        Criacao de uma nova conta
        */
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ContaModel conta)
        {
            string id = "";

            if (conta.Type!=null && conta.Type.Equals("Paciente"))
            {
                DateTime data = DateTime.Parse(conta.DataNascimento);
                List<string> contac = new List<string>();
                contac.Add(conta.Contactos);
                id = model.novoPaciente(conta.Email, conta.Password, conta.Nome, data, conta.Morada, conta.Nif, conta.Codigo_postal, contac, conta.Localidade);
            }
            else
            {
                DateTime data = DateTime.Parse(conta.DataNascimento);
                model.fazerPedidoInscricao(conta.Email, conta.Password, conta.Nome, data, conta.Nif, conta.Morada, conta.Codigo_postal, conta.Localidade);
            }
            return Ok(id);
        }

        // PUT /contas/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> Put(int id, [FromBody] Conta user)
        //{
        //    model.Update(id, user);

        //    return NoContent();
        //}

        // DELETE /contas/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> Delete(int id)
        //{
        //    model.Delete(id);

        //    return NoContent();
        //}

        /* /contas/login
        Login como Paciente ou Medico
        */
        [HttpGet("login")]
        public ActionResult Get([FromQuery] string Email,
                                          [FromQuery] string Password)
        {
            Conta c = null; 
            int type=-1;
            try
            {
                c = this.model.login(Email, Password);
            }
            catch (PasswordErrada e)
            {
                return Unauthorized();
            }
            catch (MailNaoRegistado e)
            {
                return Unauthorized();
            }
            
            return Ok(c.getID());
        }

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}





