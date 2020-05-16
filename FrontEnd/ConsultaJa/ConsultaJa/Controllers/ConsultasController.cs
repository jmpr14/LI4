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
using Microsoft.AspNetCore.Authorization;

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
        Criacao de uma consulta para um dado paciente 
        */
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> RegistarConsulta([FromBody] ConsultaModel consulta)
        {

            string idPaciente = consulta.Paciente;
            int ano = Convert.ToInt32(consulta.Data.Substring(0, 4));
            int mes = Convert.ToInt32(consulta.Data.Substring(5, 7));
            int dia = Convert.ToInt32(consulta.Data.Substring(8));
            int hora = Convert.ToInt32(consulta.Hora.Substring(0, 2));
            int minuto = Convert.ToInt32(consulta.Hora.Substring(4,6));
            model.solicitarConsulta(idPaciente, ano, mes, dia, hora, minuto);
            return Ok();
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

        /* /consultas/listaAg
        Obter a lista das consultas agendadas dado o id de um Medico ou Paciente
        */
        [HttpGet("listaAg")]
        [Authorize]
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
        [Authorize]
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







