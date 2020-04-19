﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ConsultaJa.Models;
using Newtonsoft.Json;
using System;

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

        // GET /contas
        //[HttpGet]
        //public IEnumerable<Conta> Get()
        //{
        //    return model.GetAll();
        //}

        // GET /contas/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> Get(int id)
        //{
        //    return Ok(model.getConta(id));
        //}

        // POST /contas
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ContaModel conta)
        {
            string idPaciente = "";

            if (conta.Type!=null && conta.Type.Equals("Paciente"))
            {
                DateTime data = DateTime.Parse(conta.DataNascimento);
                List<string> contac = new List<string>();
                contac.Add(conta.Contactos);
                idPaciente = model.novoPaciente(conta.Email, conta.Password, conta.Nome, data, conta.Morada, conta.Nif, conta.Codigo_postal, contac, conta.Localidade);
            }
            else
            {
                //string idPaciente = model.novoPaciente(valueOfEmail, valueOfPassword, valueOfNome, valueOfDataNascimento, valueOfMorada, valueOfNIF, valueOfCodigo_Postal, valueOfContactos, valueOfLocalidade);
            }
            return Ok(idPaciente);
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

        // /contas/login
        [HttpGet("login")]
        public ActionResult Get([FromQuery] string Email,
                                          [FromQuery] string Password)
        {
            Conta c = null;
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





