using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultaJa
{
	public class Paciente : Conta
	{

		/**
		 * Variável que guarda a morada do paciente 
		 */
		private string morada;

		/**
		 * Variável que representa o nif 
		 * do objeto da classe paciente 
		 */
		private string nif;

		/**
		 * Informações gerais acerca do paciente 
		 */
		private Dictionary<string, List<string>> infoGeral;

		/**
		 * Variável que guarda a data de nascimento do paciente 
		 */
		private DateTime dataNascimento;

		/**
		 * Variável que guarda o saldo do paciente 
		 */
		private int saldo;

		/**
		 * Variável de instância que corresponde ao 
		 * código postal do paciente
		 */
		private string codigo_postal;

		/**
		 * Variável que guarda uma lista com todas 
		 * as consultas agendadas para o paciente
		 */
		private Dictionary<int,Consulta> agendadas;

		/**
		 * Variável que guarda uma lista com o histórico 
		 * de consultas administradas ao paciente
		 */
		private Dictionary<int,Consulta> historico;

		/**
		 * Variável que guarda uma lista com as consultas 
		 * provisóriamente marcadas por médicos à espera 
		 * da confirmação do próprio cliente
		 */
		private Dictionary<int,Consulta> pendentes;

		/**
		 * Construtor para objetos da classe Paciente 
		 */
		public Paciente(string id, string email, string password, string nome, string morada, string nif, DateTime dataNascimento, string codigo_postal) : 
			base(email,password,nome,dataNascimento)
		{
			this.setID(id);
			this.morada = morada;
			this.nif = nif;
			this.dataNascimento = dataNascimento;
			this.saldo = 0;
			this.codigo_postal = codigo_postal;
			this.infoGeral = new Dictionary<string, List<string>>();
			this.agendadas = new Dictionary<int, Consulta>();
			this.historico = new Dictionary<int, Consulta>();
			this.pendentes = new Dictionary<int, Consulta>();
		}

		/**
		 * Método que retorna o mail do objeto 
		 * da classe Paciente ao qual é enviado 
		 * o método
		 */
		public string getEmail() 
		{
			return base.getEmail();
		}

		/**
		 * Método que retorna a password do objeto 
		 * da classe Paciente ao qual é enviado 
		 * o método
		 */
		public string getPassword()
		{
			return base.getPassword();
		}

		/**
		 * Método que retorna o nome do 
		 * paciente ao qual é enviado o método
		 */
		public string getNome()
		{
			return base.getNome();
		}

		/**
		 * Método que retorna o código
		 * postal do objeto da classe Paciente 
		 * ao qual é enviado o método
		 */
		public string getCodigo_Postal()
		{
			return this.codigo_postal;
		}

		/**
		 * Método que retorna o nif do objeto da 
		 * classe Paciente ao qual é enviado o 
		 * método
		 */
		public string getNif()
		{
			return this.nif;
		}

		/**
		 * Método que retorna o saldo do objeto 
		 * da classe Paciente ao qual é enviado 
		 * o método
		 */
		public int getSaldo()
		{
			return this.saldo;
		}

		/**
		 * Método que retorna a morada do objeto 
		 * da classe Paciente ao qual é enviado 
		 * o método
		 */
		public string getMorada()
		{
			return this.morada;
		}

		/**
         * Método que retorna uma lista com todos os 
         * contactos disponíveis associados a um paciente
         */
		public List<string> getContactos()
		{
			return base.getContactos();
		}

		/**
		 * Método que permite a atribuição de um 
		 * valor à variavel id do paciente ao qual 
		 * é enviado o método
		 */
		public void setID(string id)
		{
			base.setID(id);
		}

		/**
		 * Método que permite adicionar um 
		 * contacto a um paciente
		 */
		public void addContacto(string contacto)
		{
			base.addContacto(contacto);
		}

		/**
		 * Método que permite adicionar uma informação 
		 * ao perfil de um paciente 
		 */
		public void addInfo(string descricao, string info)
		{
			List<string> l;
			/* Se já existir a categoria adicionamos 
			 * à respetiva lista */
			if (this.infoGeral.TryGetValue(descricao, out l))
				l.Add(info);

			else
			{
				l = new List<string>();
				l.Add(info);
				this.infoGeral.Add(descricao, l);
			}
		}

		/**
		 * Implementação do método ToString 
		 * para objetos da classe Paciente 
		 */
		public override string ToString()
		{
			StringBuilder sb = new StringBuilder();
			sb.Append("Email: ");
			sb.Append(this.getEmail());
			sb.Append("; ");
			sb.Append("NIF: ");
			sb.Append(this.nif);
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
		 * Método que permite propor uma 
		 * consulta a um paciente
		 */
		public void addPropostaConsulta(Consulta c)
		{
			this.pendentes.Add(c.getID(), c);
		}

		/**
		 * Método que permite aceitar uma proposta 
		 * de consulta fornecendo o id da respetiva 
		 * consulta
		 */
		public void aceitarProposta(int idConsulta)
		{
			Consulta c;
			if(this.pendentes.TryGetValue(idConsulta, out c))
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
			if(this.agendadas.TryGetValue(idConsulta, out c))
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
		 * Método que permite rejeitar uma proposta 
		 * de consulta fornecendo o id da respetiva 
		 * consulta
		 */
		public void rejeitarProposta(int idConsulta)
		{
			/* Apenas removemos a consulta da 
			 * lista de pendentes */
			this.pendentes.Remove(idConsulta);
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

			Paciente p = (Paciente)obj;

			return p.getID().Equals(this.getID());
		}
	}
}