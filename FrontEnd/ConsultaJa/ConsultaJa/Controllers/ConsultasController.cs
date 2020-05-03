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
    public class ConsultasController : ControllerBase
    {
        private ConsultaJaModel model = new ConsultaJaModel();

        private readonly ILogger<ConsultasController> _logger;

        public ConsultasController(ILogger<ConsultasController> logger)
        {
            _logger = logger;
        }

        // GET /contas
        //[HttpGet]
        //public IEnumerable<Conta> Get()
        //{
        //    return model.GetAll();
        //}

        // GET /contas/P5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get(int id)
        //{
        //    return Ok(model.getConta(id));
        //}

        /* POST /contas
        Criacao de uma nova conta
        */
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] ContaModel conta)
        //{
        //    string id = "";

        //    if (conta.Type!=null && conta.Type.Equals("Paciente"))
        //    {
        //        DateTime data = DateTime.Parse(conta.DataNascimento);
        //        List<string> contac = new List<string>();
        //        contac.Add(conta.Contactos);
        //        id = model.novoPaciente(conta.Email, conta.Password, conta.Nome, data, conta.Morada, conta.Nif, conta.Codigo_postal, contac, conta.Localidade);
        //    }
        //    else
        //    {
        //        DateTime data = DateTime.Parse(conta.DataNascimento);
        //        model.fazerPedidoInscricao(conta.Email, conta.Password, conta.Nome, data, conta.Nif, conta.Morada, conta.Codigo_postal, conta.Localidade);
        //    }
        //    return Ok(id);
        //}

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

        /* /consultas/listaAg
        Obter a lista das consultas agendadas dado o id de um Medico ou Paciente
        */
        [HttpGet("listaAg")]
        public ActionResult Get([FromQuery] string id)
        {
            List<Consulta> lc = null; 
            try
            {
                lc = this.model.getConsultasAgendadas(id);
            }
            catch (MailNaoRegistado e)
            {
                return Unauthorized();
            }
            
            return Ok(lc);
        }

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}





