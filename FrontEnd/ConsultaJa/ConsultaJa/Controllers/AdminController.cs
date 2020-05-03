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
using System.Linq;

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
            List<ContaModel> lcm = new List<ContaModel>();

            lc = this.model.getCandidatos();

            foreach(Conta c in lc)
            {
                ContaModel m = new ContaModel();

                m.Type = "Medico";
                m.Nome = c.getNome();
                m.Email = c.getEmail();
                m.Password = c.getPassword();
                m.DataNascimento = c.getDataNascimento().ToString().Substring(0,10);
                //m.Morada = c.getMorada();
                //m.Nif = c.getNif();
                //m.Codigo_postal = c.getCodogoPostal();
                //m.Contactos = c.getContactos();
                //m.Localidade = c.getLocalidade();

                lcm.Add(m);

            }

            return Ok(lcm);
        }

        public override NoContentResult NoContent()
        {
            return base.NoContent();
        }
    }
}
