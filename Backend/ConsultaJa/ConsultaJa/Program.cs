using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsultaJa
{
    public class ConsultaJAT
    {
        static void Main(string[] args)
        {
            Medico m = new Medico("123789456", "Rua do Cruzeiro...");
            m.classificar(4);
            m.classificar(3);
            m.classificar(3);
            m.classificar(5);
            m.addContacto("934752103");
            Console.WriteLine(m.ToString());
        }
    }
}
