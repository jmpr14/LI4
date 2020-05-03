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
        /* API do backend*/
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
        public ActionResult consultasAgendadas([FromQuery] string id)
        {
            List<Consulta> lc = null;
            List<ConsultaModel> lcm = new List<ConsultaModel>();
            try
            {
                lc = this.model.getConsultasAgendadas(id);
                foreach (Consulta c in lc)
                {
                    ConsultaModel cm = new ConsultaModel();
                    cm.Id = c.getID();
                    cm.Medico = c.getMedico().getNome();
                    cm.Paciente = c.getPaciente().getNome();
                    cm.Data = c.getData_Hora().ToString().Substring(0, 10);
                    cm.Hora = c.getData_Hora().ToString().Substring(11);
                    cm.Localidade = c.getLocalidade();
                    cm.PrecoUni = c.getPrecoUni();
                    cm.Morada = c.getLocalidade();
                    cm.Estado = c.getEstado();
                    cm.Observacoes = c.getObservacoes();
                    lcm.Add(cm);
                }
            }
            catch (MailNaoRegistado e)
            {
                return Unauthorized();
            }
            
            return Ok(lcm);
        }

        /* /consultas/listaH
        Obter a lista do historico de consultas dado o id de um Medico ou Paciente
        */
        [HttpGet("listaH")]
        public ActionResult historicoConsultas([FromQuery] string id)
        {
            List<Consulta> lc = null;
            List<ConsultaModel> lcm = new List<ConsultaModel>();
            try
            {
                lc = this.model.getHistorico(id);
                foreach(Consulta c in lc)
                {
                    ConsultaModel cm = new ConsultaModel();
                    cm.Id = c.getID();
                    cm.Medico = c.getMedico().getNome();
                    cm.Data = c.getData_Hora().ToString().Substring(0, 10);
                    cm.Hora = c.getData_Hora().ToString().Substring(11);
                    cm.Localidade = c.getLocalidade();
                    cm.PrecoUni = c.getPrecoUni();
                    cm.Morada = c.getLocalidade();
                    cm.Estado = c.getEstado();
                    cm.Observacoes = c.getObservacoes();
                    lcm.Add(cm);
                }
            }
            catch (MailNaoRegistado e)
            {
                return Unauthorized();
            }

            return Ok(lcm);
        }

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}





