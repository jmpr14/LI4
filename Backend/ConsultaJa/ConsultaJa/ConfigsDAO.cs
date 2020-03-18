using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace ConsultaJaDB
{
    class ConfigsDAO
    {
        /**
		 * Variável de instância da classe 
		 * ContaDAO que é retornada quando 
		 * é pedida uma nova instância
		 */
        private static ConfigsDAO inst;

		/**
		 * String a partir da qual conseguimos 
		 * aceder à base de dados
		 */
		private string connectionstring;

		/**
		 * Método que permite carregar a password 
		 * de um ficheiro configs.txt
		 */
		private static string getPassword()
		{
			/* Criamos um objeto para ler 
			 * do ficheiro configs */
			StreamReader sr = new StreamReader("configs.txt");
			string ret = sr.ReadLine();
			/* Fechamos a stream que usamos 
			 * para ler do ficheiro */
			sr.Close();
			return ret;
		}

		/**
		 * Construtor para objetos da classe ContaDAO. 
		 * É de notar que este construtor é privado
		 */
		private ConfigsDAO()
		{
			string server = "localhost";
			string database = "consultaja";
			string uid = "root";
			string password = getPassword();
			this.connectionstring = "SERVER=" + server + ";" + "DATABASE=" +
			database + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";";
		}

		/**
		 * Método que permite obter um único 
		 * objeto da classe ContaDAO
		 */
		public static ConfigsDAO getInstance()
		{
			if (ConfigsDAO.inst == null)
				ConfigsDAO.inst = new ConfigsDAO();
			return ConfigsDAO.inst;
		}

		/**
		 * Método que retorna o número de parâmetros 
		 * definidos na base de dados para a aplicação
		 */
		public int size()
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			/* Abrimos a conexão */
			connection.Open();

			DataTable dt = new DataTable();
			StringBuilder sb = new StringBuilder();
			sb.Append("select * from configs");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);

			connection.Close();

			return dt.Rows.Count;
		}

		/**
		 * Método que permite aceder ao valor de 
		 * um determinado parâmetro dado o seu nome
		 */
		private int get(string param, MySqlConnection connection)
		{
			int ret = -1;
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("select value from configs where parametro='");
			sb.Append(param);
			sb.Append("'");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);

			/* Apenas teremos uma linha nesta tabela */
			foreach(DataRow dr in dt.Rows)
			{
				ret = dr.Field<int>("value");
			}

			return ret;
		}

		/**
		 * Método que permite atualizar o valor de um 
		 * dado parâmetro existente na base de dados
		 */
		private void increment(string param, int newValue, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("update configs set value=");
			sb.Append(newValue);
			sb.Append(" where parametro='");
			sb.Append(param);
			sb.Append("'");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);
		}

		/**
		 * Método que acede e incrementa um dado 
		 * parâmetro na base de dados de uma forma
		 * atómica
		 */
		public void getAndIncrement(string param)
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			/**
			 * Obtemos a exclusão 
			 * mútua da conexão
			 */
			Monitor.Enter(this);

			/* Abrimos a conexão */
			connection.Open();

			/* Acedemos e incrementamos o valor 
			 * do parâmetro pedido */
			this.increment(param,this.get(param, connection)+1,connection);

			/* Fechamos a conexão */
			connection.Close();

			/* Cedemos o monitor */
			Monitor.Exit(this);
		}
	}
}
