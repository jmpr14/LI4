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
using System.IO;
using System.Text;

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
        public ActionResult ConsultasAgendadas([FromQuery] string id)
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

        /* GET /consultas/notificacao
        Obter notificacoes
        */
        [HttpGet("notify")]
        [Authorize]
        public ActionResult Notificacao([FromQuery] string id)
        {
            List<Consulta> lc = null;
            string message = "Nao tem notificacoes";
            try
            {
                lc = this.model.getConsultasAgendadas(id);
                foreach (Consulta c in lc)
                {
                    DateTime agora = DateTime.Now;
                    DateTime horaConsulta = c.getData_Hora();
                    TimeSpan ts = horaConsulta-agora;
                    if (ts.TotalMinutes <= 30 && ts.TotalMinutes >= 0)
                    {
                        if (id.Contains("P"))
                            message = "Tem consulta a menos de 30 minutos com o médico " + c.getMedico().getNome() + " às " + horaConsulta.TimeOfDay + " horas!";
                        else
                            message = "Tem consulta a menos de 30 minutos com o paciente " + c.getPaciente().getNome() + " às " + horaConsulta.TimeOfDay + " horas!";
                        break;
                    }
                }
                if (message.Contains("Nao tem notificacoes"))
                    return Unauthorized(message);
            }
            catch (MailNaoRegistado e)
            {
                return Unauthorized("Mail Invalido");
            }

            return Ok(message);
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
                    Medico m = (Medico) model.getConta(id);
                    lc = this.model.getPedidos(m.getCodigo_Postal());
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
                    cm.Paciente = c.getPaciente().getNome();
                    cm.Data = c.getData_Hora().ToString().Substring(0, 10);
                    cm.Hora = c.getData_Hora().ToString().Substring(11,5);
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


        /* /consultas/receitas
        Obter a o pdf de uma receita relativo a uma consulta
        */
        [HttpGet("receitas")]
        [Authorize]
        public ActionResult Receitas([FromQuery] int id)
        {
            ReceitaModel rm = new ReceitaModel();
            try
            {
                Receita r = this.model.getReceita(id);
                rm.Id = id;
                rm.Observacoes = this.model.getObservacoesConsulta(id);
                rm.Utente = r.getNomePaciente();
                rm.NIFUt = r.getNifPaciente();
                if (r.getContactosPaciente() != null)
                {
                    rm.ContactoUt = r.getContactosPaciente()[0];
                } else
                {
                    rm.ContactoUt = "";
                }
                rm.Medico = r.getNomeMedico();
                rm.NIFMed = r.getNifMedico();
                if (r.getContactosMedico().Count>0)
                {
                    rm.ContactoMed = r.getContactosMedico()[0];
                }
                else
                {
                    rm.ContactoMed = "";
                }
                List<PrescricaoModel> ps = new List<PrescricaoModel>();
                foreach (Prescricao p in r.getPrescricoes()){
                    PrescricaoModel pm = new PrescricaoModel();
                    pm.Nome = p.getNomeFarmaco();
                    pm.Posologia = p.getPosologia();
                    pm.Quantidade = p.getQuantidade().ToString();
                    ps.Add(pm);
                }
                rm.Prescricoes = ps;
            }
            catch (Exception e)
            {
                return Unauthorized();
            }

            return Ok(rm);
        }

        /* /consultas/posconsulta
         * Marcar consulta Realizada, sendo que se recebe uma receita, as observacoes e marcar consulta
        */
        [HttpPost("posconsulta")]
        [Authorize]
        public ActionResult PosConsulta([FromBody] PosConsultaModel posconsulta)
        {
            try
            {
                foreach (PrescricaoModel rm in posconsulta.Prescricoes)
                {
                    model.addPrescricao(Int32.Parse(posconsulta.IdConsulta), rm.Nome, Decimal.Parse(rm.Quantidade), rm.Posologia);
                }
                Consulta c = model.getConsulta(Int32.Parse(posconsulta.IdConsulta));
                Paciente p = c.getPaciente(); Medico m = c.getMedico();
                model.addObsToConsulta(Int32.Parse(posconsulta.IdConsulta), posconsulta.Observacoes);
                model.marcarRealizada(Int32.Parse(posconsulta.IdConsulta));
            }
            catch (Exception e)
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





