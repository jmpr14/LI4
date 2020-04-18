using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultaJa.Models
{
    public class Medico : Conta
    {
        public string Morada { get; set; }
        public string NIF { get; set; }
        public string Codigo_Postal { get; set; }
        public List<string> Contactos { get; set; }
        public int Saldo { get; set; }
        public double Classificacao { get; set; }
        public int NumClassificacoes { get; set; }

    }
}