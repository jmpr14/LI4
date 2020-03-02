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
            Paciente p = new Paciente("djhfiuehfsef@gmail.com","123456","456789123");
            Console.WriteLine(p.ToString());
        }
    }
}
