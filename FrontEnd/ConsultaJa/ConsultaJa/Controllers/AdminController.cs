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
    public class AdminController : ControllerBase
    {
        private ConsultaJaModel model = new ConsultaJaModel();

        private readonly ILogger<AdminController> _logger;

        public AdminController(ILogger<AdminController> logger)
        {
            _logger = logger;
        }

        // GET /contas
        //[HttpGet]
        //public IEnumerable<Conta> Get()
        //{
        //    return model.GetAll();
        //}

        //GET /contas/P5
       [HttpGet]
        public async Task<IActionResult> Get([FromQuery]string admin)
        {

            AdminModel cmodel = new AdminModel();

            cmodel.Preco = this.model.getPreco();
            cmodel.NumMedicos = this.model.getMedicos();
            cmodel.NumPacientes = this.model.getPacientes();
            
            return Ok(cmodel);
        }

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

        /* /admin/listaMed
        Obter a lista das consultas agendadas dado o id de um Medico ou Paciente
        */
        [HttpGet("listaMed")]
        public ActionResult Get()
        {
            List<Conta> lc = null;
            try
            {
                lc = this.model.getCandidatos();
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
