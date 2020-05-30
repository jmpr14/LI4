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

        /* POST /consultas/regCons
         * Método que permite a um paciente solicitar 
		 * uma consulta na aplicação ConsultaJa
        */
        [HttpPost("regCons")]
        [Authorize]
        public async Task<IActionResult> RegistarConsulta([FromBody] ConsultaModel consulta)
        {
            string idPaciente = consulta.Paciente;
            try
            {
                Console.WriteLine((string)consulta.Data.Substring(0, 4));
                int ano = Int32.Parse((string)consulta.Data.Substring(0, 4));              
                int mes = Int32.Parse((string)consulta.Data.Substring(5, 2));              
                int dia = Int32.Parse((string)consulta.Data.Substring(8, 2));              
                int hora = Int32.Parse((string)consulta.Hora.Substring(0, 2));             
                int minuto = Int32.Parse((string)consulta.Hora.Substring(3, 2));           
                model.solicitarConsulta(idPaciente, ano, mes, dia, hora, minuto);          
            } catch(FormatException e)                                                     
            {
                Console.WriteLine(e.Message);
                return Unauthorized();
            }
            return Ok();
        }

        /* GET /consultas/propCons
         * Método que permite a um médico propor 
		 * uma consulta a um paciente, tendo este 
		 * previamente criado uma solicitação de 
		 * consulta
        */
        [HttpGet("propCons")]
        [Authorize]
        public async Task<IActionResult> ProporConsulta([FromQuery] int idConsulta, [FromQuery] string idMedico)
        {
            model.proporConsulta(idMedico, idConsulta);
            return Ok();
        }

        /* GET /consultas/aceitarCons
         * Método que permite a um cliente aceitar uma 
		 * proposta de consulta feita por um médico
        */
        [HttpGet("aceitarCons")]
        [Authorize]
        public async Task<IActionResult> AceitarConsulta([FromQuery] int id, [FromQuery] bool action)
        {
            Console.WriteLine(id);
            if (action) model.aceitaConsulta(id);
            else model.rejeitarConsulta(id);
            return Ok();
        }

        /* GET /consultas/listaAg
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

        /* /consultas/consPropostas
         * Obter a lista das consultas propostas dado o id de um Paciente
        */
        [HttpGet("consPropostas")]
        [Authorize]
        public ActionResult consultasPropostas([FromQuery] string id)
        {
            List<Consulta> lc = null;
            List<ConsultaModel> lcm = new List<ConsultaModel>();
            try
            {
                if (id.Substring(0, 1).CompareTo("P") == 0) {
                    lc = this.model.getConsultasPropostas(id);
                } else {
                    lc = this.model.getPedidos();
                }
                foreach (Consulta c in lc)
                {
                    ConsultaModel cm = new ConsultaModel();
                    cm.Id = c.getID();
                    if(c.getMedico()!=null) cm.Medico = c.getMedico().getNome();
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







