using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsultaJa.Models
{
    public class ConsultaModel
    {
        public int Id { get; set; }
        public string IdPaciente { get; set; }
        public string IdMedico { get; set; }
        public string Data_hora { get; set; }
		public string Localidade { get; set; }
		public int PrecoUni { get; set; }
        public string Morada { get; set; }
        public int Estado { get; set; }
        public string Observacoes { get; set; }
	}
}
