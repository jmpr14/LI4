using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsultaJa
{
    class Teste
    {
        public static void Main(string[] args)
        {
            try
            {
                ConsultaJaModel cjm = new ConsultaJaModel();

                /* Registamos um paciente */
                //string idPaciente = cjm.novoPaciente("carlosSilva@gmail.com", "fcportocampeao", "Carlos Costa da Silva", new DateTime(1987, 11, 25), "Rua da Igreja",
                //        "251458221", "2785-191", new List<string>(), "Faro");

                //cjm.registarInfoGeralPaciente(idPaciente, "Alergias", "Paracetemol");
                //cjm.registarInfoGeralPaciente(idPaciente, "Tipo de Sangue", "O (-)");

                //cjm.addNovoContacto("P1", "910257200");
                //cjm.addNovoContacto("P1", "253645255");
                //cjm.addNovoContacto("P1", "939100251");
                //cjm.efetuaCarregamento("P1", 15000);
                //cjm.fazerPedidoInscricao("migueloliveira985@gmail.com", "miguelito1999", "Miguel Oliveira",
                //    new DateTime(1999, 08, 07), "266951155", "Rua do Cruzeiro nº38", "4730-280", "Braga");
                //cjm.trataPedido("M1", true);
                //cjm.solicitarConsulta("P1", 2020, 12, 28, 9, 00);
                //cjm.proporConsulta("M1", 1);
                //cjm.aceitaConsulta(7);
                //cjm.proporConsulta("M1", 7);
                Console.WriteLine("Pedidos pendentes:");
                foreach(Consulta c in cjm.getPedidos())
                {
                    Console.WriteLine(c.ToString());
                }
                Console.WriteLine("Test program exited successfully");
            }
            catch (Exception exc)
            {
                Console.WriteLine("[" + exc.GetType() + "] - [" + exc.GetBaseException() + "] - " + exc.Message);
            }
        }
    }
}
