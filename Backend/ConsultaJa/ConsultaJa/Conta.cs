using System;

namespace ConsultaJa
{
	public abstract class Conta
	{
		/**
		 * Variável que guarda o id único da 
		 * conta aquando do seu registo na 
		 * aplicação
		 */
		private string id;

		/**
		 * Variável que guarda o email 
		 * associado à conta
		 */
		private string email;

		/**
		 * Variável que guarda a password 
		 * da conta
		 */
		private string password;

		/**
		 * Variável que guarda o nome 
		 * associado à conta
		 */
		private string nome;

		/**
		 * Variável que guarda a data de nascimento 
		 * do utilizador da conta
		 */
		private DateTime dataNascimento;

		/**
		 * Método que retorna a string correspondente 
		 * ao id da conta à qual é enviado o método
		 */
		public string getID()
		{
			return this.id;
		}

		/**
		 * Método que retorna o mail associado 
		 * à conta à qual é enviado o método
		 */
		public string getEmail()
		{
			return this.email;
		}

		/**
		 * Método que retorna a password associada 
		 * à conta à qual é enviado o método
		 */
		public string getPassword()
		{
			return this.password;
		}

		/**
		 * Método que retorna o nome associado
		 * à conta à qual é enviado o método
		 */
		public string getNome()
		{
			return this.nome;
		}

		/**
		 * Método que permite atribuir um valor à 
		 * variável id do objeto da classe conta ao 
		 * qual é enviado o método
		 */
		public void setID(string id)
		{
			this.id = id;
		}

		/**
		 * Construtor para objetos da classe Conta
		 */
		public Conta(string email, string password, string nome, DateTime dataNascimento)
		{
			this.id = "";
			this.email = email;
			this.password = password;
			this.nome = nome;
			this.dataNascimento = dataNascimento;
		}

		/**
		 * Método que permite alterar a password 
		 * da conta, fornecendo a sua pass antiga
		 */
		public void alterarPassword(string password, string novaPass)
		{
			if (!this.password.Equals(password))
				throw new PasswordErrada("Password incorreta");

			this.password = novaPass;
		}
	}
}

