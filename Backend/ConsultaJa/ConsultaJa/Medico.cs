using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultaJa
{
    public class Medico : Conta
    {
        /**
         * Variável que guarda a morada do médico
         */
        private string morada;

        /**
         * Variável que guarda o nif do médico
         */
        private string nif;

        /**
         * Variável que guarda a classificação 
         * do médico em questão
         */
        private double classificacao;

        /**
         * Variável que guarda a quantidade 
         * de classificações feitas ao médico
         */
        private int numClassificacoes;

        /**
         * Variável que guarda o saldo 
         * do médico em questão
         */
        private int saldo;

        /**
         * Variável de instância que guarda 
         * o código postal pertencente ao médico
         */
        private string codigo_postal;

        /**
         * Estrutura de dados que guarda o 
         * histórico de consultas do médico
         */
        Dictionary<int, Consulta> historico;

        /**
         * Estrutura de dados que guarda o conjunto 
         * de consultas agendadas para o médico
         */
        Dictionary<int, Consulta> agendadas;

        /**
         * Estrutura de dados que guarda o conjunto 
         * de consultas pendentes para o médico. 
         * Estas consultas são propostas por si 
         * e aguardam aprovação do paciente envolvido 
         * para passarem para agendadas
         */
        Dictionary<int, Consulta> pendentes;

        /**
         * Construtor para objetos 
         * da classe médico
         */
        public Medico(string email, string password, string nome, DateTime dataNascimento, string nif, string morada, string codigo_postal) : 
            base(email,password,nome,dataNascimento)
        {
            this.nif = nif;
            this.morada = morada;
            this.classificacao = -1; /* Valor que representa ausência de qualquer classificação */
            this.numClassificacoes = 0;
            this.saldo = 0;
            this.codigo_postal = codigo_postal;
            this.historico = new Dictionary<int, Consulta>();
            this.agendadas = new Dictionary<int, Consulta>();
            this.pendentes = new Dictionary<int, Consulta>();
        }

        /**
         * Método que retorna o saldo do objeto da 
         * classe Medico ao qual é enviado o método
         */
        public double getSaldo()
        {
            return (double)saldo / 100;
        }

        /**
         * Método que retorna a classificação do 
         * objeto da classe Médico ao qual é enviado 
         * o respetivo médico
         */
        public double getClassificacao()
        {
            return this.classificacao;
        }

        /**
         * Método que retorna a morada do objeto da 
         * classe Medico ao qual é enviado o método
         */
        public string getMorada()
        {
            return this.morada;
        }

        /**
         * Método que retorna o nif do objeto da 
         * classe Medico ao qual é enviado o método
         */
        public string getNif()
        {
            return this.nif;
        }

        /**
         * Método que permite obter o número 
         * de classificações feitas a um médico
         */
        public int getNumClassificacoes()
        {
            return this.numClassificacoes;
        }

        /**
         * Método que retorna o código 
         * postal de um médico
         */
        public string getCodigo_Postal()
        {
            return this.codigo_postal;
        }

        /**
         * Método que retorna uma lista com todos os 
         * contactos disponíveis associados a um médico
         */
        public List<string> getContactos()
        {
            return base.getContactos();
        }

        /**
         * Método que permite adicionar um certo 
         * numerário à carteira digital do médico
         */
        public void pagamento(int numerario)
        {
            this.saldo += numerario;
        }

        /**
         * Método que permite adicionar um contacto 
         * à lista de contactos de um médico
         */
        public void addContacto(string contacto)
        {
            base.addContacto(contacto);
        }

        /**
         * Método que permite adicionar uma classificação 
         * ao objeto da classe Medico ao qual é enviado 
         * o método
         */
        public void classificar(double classificacao)
        {
            if (classificacao <= 5 && classificacao >= 0)
            {
                this.classificacao *= (double)this.numClassificacoes;
                this.classificacao += classificacao;
                this.numClassificacoes++;
                this.classificacao /= (double)this.numClassificacoes;
            }
            else
                throw new ClassificacaoInvalida("Classificação Inválida");
        }

        /**
         * Implementação do método ToString 
         * para objetos da classe Medico
         */
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("Nif: ");
            sb.Append(this.nif);
            sb.Append("; Morada: ");
            sb.Append(this.morada);
            sb.Append("; Classificação: ");
            sb.Append(this.classificacao);
            sb.Append("; Contactos: {");
            foreach (string s in this.getContactos())
            {
                sb.Append(s);
                sb.Append(", ");
            }
            sb.Append("}");
            return sb.ToString();
        }

        /**
         * Método que retorna o histórico 
         * de um dado médico
         */
        public override Dictionary<int, Consulta> getHistorico()
        {
            return this.historico;
        }

        public override Dictionary<int, Consulta> getConsultasAgendadas()
        {
            return this.agendadas;
        }

        /**
         * Método que permite adicionar uma consulta 
         * pendente a um objeto da classe Medico
         */
        public void addPendente(Consulta c)
        {
            this.pendentes.Add(c.getID(), c);
        }

        /**
         * Método que permite marcar uma consulta 
         * pendente como agendada caso ela existe 
         * no estado pendente
         */
        public void agendar(int idConsulta)
        {
            Consulta c;
            if (this.pendentes.TryGetValue(idConsulta, out c))
            {
                /* Marcamos a consulta como agendada */
                c.agendar();

                /* Removemos a consulta da lista 
				 * de pendentes */
                this.pendentes.Remove(idConsulta);

                /* Adicionamos à lista de agendadas */
                this.agendadas.Add(c.getID(), c);
            }
        }

        /**
		 * Método que move uma consulta da lista 
		 * de agendadas para o histórico
		 */
        public void moveParaHistorico(int idConsulta)
        {
            Consulta c;
            if (this.agendadas.TryGetValue(idConsulta, out c))
            {
                /* Marcamos a consulta como realizada */
                c.realizar();

                /* Removemos a consulta da lista 
				 * das agendadas */
                this.agendadas.Remove(idConsulta);

                /* Adicionamos a consulta ao histórico */
                this.historico.Add(c.getID(), c);
            }
        }

        /**
         * Método que permite desmarcar a consulta de um médico
         */
        public void desmarcarConsulta(int idConsulta)
        {
            /* Removemos a consulta da lista das agendadas */
            this.agendadas.Remove(idConsulta);
        }

        /**
		 * Método que permite efetuar um carregamento 
		 * para a carteira digital de um cliente na 
		 * aplicação
		 */
        public int efetuaCarregamento(int montante)
        {
            return this.saldo += montante;
        }

        /**
         * Implementação do método equals 
         * para objetos da classe Medico
         */
        public override bool Equals(object obj)
        {
            if (this == obj) return true;

            if (obj == null || !this.GetType().Equals(obj.GetType())) return false;

            Medico m = (Medico)obj;

            return m.getID().Equals(this.getID());
        }
    }
}