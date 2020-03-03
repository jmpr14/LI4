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
            ConsultaJaModel cjm = new ConsultaJaModel();
            cjm.novoMedico("Miguel Oliveira", "migueloliveira985@gmail.com", "sdhawfebfse", null, new DateTime(1999, 08, 07), "Rua do Cruzeiro", "266951155");
        }
    }
}
