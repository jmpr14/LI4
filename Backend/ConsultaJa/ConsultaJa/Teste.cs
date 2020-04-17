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
                //string idPaciente = cjm.novoPaciente("albertosantos1989@gmail.com", "asantos1989", "Alberto Santos", new DateTime(1989, 7, 15), "Rua da Silva",
                //        "242798140", "4730-280", new List<string>(), "Braga");

                //cjm.registarInfoGeralPaciente(idPaciente, "Alergias", "Paracetemol");
                //cjm.registarInfoGeralPaciente(idPaciente, "Tipo de Sangue", "O (-)");

                //cjm.addNovoContacto("P1", "910257200");
                //cjm.addNovoContacto("P1", "253645255");
                //cjm.addNovoContacto("P1", "939100251");
                cjm.efetuaCarregamento("P1", 15000);
            }
            catch (Exception exc)
            {
                Console.WriteLine("[" + exc.GetType() + "] - [" + exc.GetBaseException() + "] - " + exc.Message);
            }
        }
    }
}
