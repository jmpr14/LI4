using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConsultaJaDB;

namespace ConsultaJa
{
    class TesteDAO
    {
        public static void Main(string[] args)
        {
            ContaDAO cdao = ContaDAO.getInstance();
            try
            {
                Conta c = null;
                c = cdao.get("M23");
                Console.WriteLine(c.ToString());
                Console.WriteLine("Size: " + cdao.size());
            }
            catch(MailNaoRegistado exc)
            {
                Console.WriteLine(exc.Message);
            }
        }
    }
}
