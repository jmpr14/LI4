using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultaJa
{
	public class Paciente : Conta
	{
		/**
		 * Variável de classe o número de 
		 * consultas administradas
		 */
		private static int numConsultas = 0;

		/**
		 * Variável que guarda a morada do paciente 
		 */
		private string morada;

		/**
		 * Variável que guarda os contactos do paciente
		 */
		private List<string> contactos;

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
		int saldo;

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
		public Paciente(string email, string password, string nome, string morada, string nif, DateTime dataNascimento) : 
			base(email,password,nome,dataNascimento)
		{
			this.morada = morada;
			this.nif = nif;
			this.dataNascimento = dataNascimento;
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
			if (this.contactos.Contains(contacto))
				throw new Exceptions.ContactoExistente("Contacto já existe.");
			this.contactos.Add(contacto);
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
		 * Método que permite agendar uma consulta 
		 * para o cliente ao qual é enviado o método
		 */
		public void agendar(Consulta c)
		{
			/* atribuimos um id à consulta
			 * aquando da sua criação */
			c.setID(numConsultas++);
			this.agendadas.Add(c.getID(), c);
			c.agendar();
		}

		/*
		public void marcaPendente(Consulta c)
		{
			Consulta c;
			if(this.agendadas.Remove(c))
				this.pendentes
		}
		*/

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
		public Dictionary<int, Consulta> getHistorico()
		{
			return this.historico;
		}

		public Dictionary<int, Consulta> getConsultasAgendadas()
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
				/* Removemos a consulta da lista 
				 * de pendentes */
				this.pendentes.Remove(idConsulta);

				/* Adicionamos à lista de agendadas */
				this.agendadas.Add(c.getID(), c);
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
	}
}