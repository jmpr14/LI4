using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsultaJa.Models
{
    public class PosConsultaModel
    {
        public string IdConsulta { get; set; }
        public List<ReceitaModel> Prescricoes { get; set; }
        public string Observacoes { get; set; }
    }
}
