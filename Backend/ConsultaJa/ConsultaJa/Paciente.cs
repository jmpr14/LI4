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
		private List<Consulta> agendadas;

		/**
		 * Variável que guarda uma lista com o histórico 
		 * de consultas administradas ao paciente
		 */
		private List<Consulta> historico;

		/**
		 * Variável que guarda uma lista com as consultas 
		 * provisóriamente marcadas por médicos à espera 
		 * da confirmação do próprio cliente
		 */
		private List<Consulta> pendentes;

		/**
		 * Construtor para objetos da classe Paciente 
		 */
		public Paciente(string email, string password, string nome, string morada, string nif, DateTime dataNascimento) : 
			base(email,password,nome,dataNascimento)
		{
			this.morada = morada;
			this.nif = nif;
			this.dataNascimento = dataNascimento;
			this.agendadas = new List<Consulta>();
			this.historico = new List<Consulta>();
			this.pendentes = new List<Consulta>();
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
			this.agendadas.Add(c);
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
	}
}