﻿using System;
using System.IO;
using MySql.Data.MySqlClient;
using System.Data;
using ConsultaJa;
using System.Text;

namespace ConsultaJaDB
{
	/**
	 * Classe que permite aceder à base de dados
	 * e extrair informações relacionadas
	 * com contas
	 */
	public class ContaDAO
	{
		/**
		 * Variável de instância da classe 
		 * ContaDAO que é retornada quando 
		 * é pedida uma nova instância
		 */
		private static ContaDAO inst = null;

		/**
		 * String utilizada para aceder 
		 * à base de dados
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
		private ContaDAO()
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
		public static ContaDAO getInstance()
		{
			if (ContaDAO.inst == null)
				ContaDAO.inst = new ContaDAO();
			return ContaDAO.inst;
		}

		/**
		 * Método que nos diz qual o número de 
		 * contas contidas num objeto da classe 
		 * ContaDAO
		 */
		public int size()
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			connection.Open();
			DataTable dt = new DataTable();

			MySqlDataAdapter msda = new MySqlDataAdapter("select * from Conta", connection);

			msda.Fill(dt);

			int ret = dt.Rows.Count;

			/* Fechamos a conexão */
			connection.Close();
			return ret;
		}

		/**
		 * Método que nos diz se uma dada 
		 * chave existe no mapeamento
		 */
		public bool contains(string id)
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			/* Abrimos a conexão */
			connection.Open();
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();

			sb.Append("select * from Conta where idConta='");
			sb.Append(id);
			sb.Append("'");

			/* Fechamos a conexão */
			connection.Close();
			return dt.Rows.Count != 0;
		}

		/**
		 * Método que permite remover todas as entradas 
		 * na tabela Contactos que referenciem a conta 
		 * cujo id é passado por parâmetro do método
		 */
		private void removeFromTableContactos(string id, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("delete from Contactos where Conta_idConta='");
			sb.Append(id);
			sb.Append("'");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);
		}

		/**
		 * Método que permite remover a entrada na 
		 * tabela medico referente ao id que é passado 
		 * como parâmetro
		 */
		private void removeFromTableMedico(string id, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("delete from Medico where idMedico='");
			sb.Append(id);
			sb.Append("'");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);
		}

		/**
		 * Método que permite remover a entrada na 
		 * tabela paciente referente ao id que é passado 
		 * como parâmetro
		 */
		private void removeFromTablePaciente(string id, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("delete from Paciente where idPaciente='");
			sb.Append(id);
			sb.Append("'");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);
		}

		/**
		 * Método que permite remover a entrada na 
		 * tabela conta referente ao id que é passado 
		 * como parâmetro
		 */
		private void removeFromTableConta(string id, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("delete from Conta where idConta='");
			sb.Append(id);
			sb.Append("'");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);
		}

		/**
		 * Método que permite remover uma conta 
		 * da base de dados fornecendo o seu ID
		 */
		public void remove(string id)
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			/* Abrimos a conexão */
			connection.Open();

			/* Removemos todas as linhas da tabela 
			 * contacto que referenciem a conta que 
			 * se pretende remover 
			 */
			this.removeFromTableContactos(id, connection);

			/* Se o id corresponder a um médico 
			 * removemos a respetiva entrada da 
			 * tabela medicò 
			 */
			if (id.Contains("M"))
				this.removeFromTableMedico(id, connection);

			/* Se corresponder a um paciente removemos 
			 * a respetiva linha da tabela Paciente 
			 */
			if (id.Contains("P"))
				this.removeFromTablePaciente(id, connection);

			/* Finalmente removemos a respetiva entrada 
			 * da tabela conta à qual se encontra atribuido 
			 * o id que é passado como parâmetro do método
			 */
			this.removeFromTableConta(id, connection);

			/* Fechamos a conexão */
			connection.Close();
		}

		/**
		 * Método que permite converter um objeto da 
		 * classe DateTime para um string que possa 
		 * ser introduzida numa base de dados MySql
		 */
		private string criarData(DateTime data)
		{
			StringBuilder sbdata = new StringBuilder();
			sbdata.Append(data.Year);
			sbdata.Append("-");
			sbdata.Append(data.Month);
			sbdata.Append("-");
			sbdata.Append(data.Day);
			return sbdata.ToString();
		}

		/**
		 * Método privado que permite adicionar 
		 * uma conta apenas na tabela Conta da 
		 * base de dados
		 */
		private void putTabConta(string id, Conta value, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("insert into Conta (idConta,nome,password,email,dataNascimento) values ('");
			sb.Append(id);
			sb.Append("','");
			sb.Append(value.getNome());
			sb.Append("','");
			sb.Append(value.getPassword());
			sb.Append("','");
			sb.Append(value.getEmail());
			sb.Append("','");
			sb.Append(this.criarData(value.getDataNascimento()));
			sb.Append("')");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);

		}

		/**
		 * Método que dado um identificador de uma 
		 * conta e o próprio objeto correspondente 
		 * acrescenta à base de dados todos os seus 
		 * contactos
		 */
		private void putTabContactos(string id, Conta value, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb;
			MySqlDataAdapter msda;

			foreach (string contacto in value.getContactos())
			{
				sb = new StringBuilder();
				sb.Append("insert into Contactos (telemovel, Conta_idConta) values ('");
				sb.Append(contacto);
				sb.Append("','");
				sb.Append(id);
				sb.Append("')");

				msda = new MySqlDataAdapter(sb.ToString(),connection);

				msda.Fill(dt);
			}
			
		}

		/**
		 * Método que permite inserir uma nova 
		 * entrada na tabela medico da base de dados
		 */
		private void putTableMedico(string id, Medico value, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("insert into medico (morada,nif,classificacao,numClassificacao,idMedico,codigo_postal,saldo) values ('");
			sb.Append(value.getMorada());
			sb.Append("','");
			sb.Append(value.getNif());
			sb.Append("','");
			sb.Append(value.getClassificacao());
			sb.Append("','");
			sb.Append(value.getNumClassificacoes());
			sb.Append("','");
			sb.Append(id);
			sb.Append("','");
			sb.Append(value.getCodigo_Postal());
			sb.Append("','");
			sb.Append(value.getSaldo());
			sb.Append("')");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);
		}

		/**
		 * Método que permite inserir uma nova 
		 * entrada na tabela paciente da base de dados
		 */
		private void putTablePaciente(string id, Paciente value, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("insert into paciente (nif,morada,saldo,idPaciente,codigo_postal) values ('");
			sb.Append(value.getNif());
			sb.Append("','");
			sb.Append(value.getMorada());
			sb.Append("','");
			sb.Append(value.getSaldo());
			sb.Append("','");
			sb.Append(id);
			sb.Append("','");
			sb.Append(value.getCodigo_Postal());
			sb.Append("')");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);
		}

		/**
		 * Método que permite adicionar uma nova conta 
		 * à base de dados, tendo fornecido o seu 
		 * identificador e o próprio objeto conta
		 */
		public void put(string id, Conta value)
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			/* Abrimos a conexão */
			connection.Open();

			/* Colocar o novo objeto 
			 * na tabela conta */
			this.putTabConta(id, value, connection);

			/* Colocar os contactos da conta 
			 * na base de dados */
			this.putTabContactos(id, value, connection);

			if (value is Medico)
				this.putTableMedico(id, (Medico)value, connection);

			if (value is Paciente)
				this.putTablePaciente(id, (Paciente)value, connection);

			/* Fechamos a conexão */
			connection.Close();
		}

		/**
		 * Método que dado os dados encontrados apos 
		 * consultar a tabela conta, constroi um 
		 * objeto da classe Medico
		 */
		private Medico createMedico(string idMedico, string nome, string password, 
			string email, DateTime dataNascimento, MySqlConnection connection)
		{
			Medico m = null;

			StringBuilder sb = new StringBuilder();

			DataTable dt = new DataTable();

			sb.Append("select * from Medico where idMedico='");
			sb.Append(idMedico);
			sb.Append("'");
			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);

			/* 
			 * Apenas existirá, no máximo 1 linha,
			 * visto que os id's são únicos
			 */
			foreach(DataRow dr in dt.Rows)
			{
				m = new Medico(dr.Field<string>("idMedico"), email, password, nome, dataNascimento, dr.Field<string>("nif"),
					dr.Field<string>("morada"), dr.Field<String>("codigo_postal"));
			}
			return m;
		}

		/**
		 * Método que dado os dados encontrados apos 
		 * consultar a tabela conta, constroi um 
		 * objeto da classe Paciente
		 */
		private Paciente createPaciente(string idPaciente, string nome, string password,
			string email, DateTime dataNascimento, MySqlConnection connection)
		{
			Paciente p = null;

			StringBuilder sb = new StringBuilder();

			DataTable dt = new DataTable();

			sb.Append("select * from Paciente where idPaciente='");
			sb.Append(idPaciente);
			sb.Append("'");
			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);

			/* 
			 * Apenas existirá, no máximo 1 linha,
			 * visto que os id's são únicos
			 */
			foreach (DataRow dr in dt.Rows)
			{
				p = new Paciente(dr.Field<string>("idPaciente"), email, password, nome, dr.Field<string>("morada"), 
					dr.Field<string>("nif"), dataNascimento, 
					dr.Field<string>("codigo_postal"));
			}
			return p;
		}

		/**
		 * Método que carrega os contactos associados 
		 * à conta na base de dados para a respetiva 
		 * conta
		 */
		private void getContactos(string id, Conta c, MySqlConnection connection)
		{
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();

			sb.Append("select * from contactos where Conta_idConta='");
			sb.Append(id);
			sb.Append("'");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);

			/* 
			 * Cada contacto lido é adicionado 
			 * à respetiva conta
			 */
			foreach(DataRow dr in dt.Rows)
			{
				c.addContacto(dr.Field<string>("telemovel"));
			}
		}

		/**
		 * Método que permite obter um objeto 
		 * da classe Conta fornecendo o seu id
		 */
		public Conta get(string id)
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			Conta c = null;

			/* Abrir a conexão */
			connection.Open();
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("select * from conta where idConta='");
			sb.Append(id);
			sb.Append("'");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);

			if (dt.Rows.Count == 0)
				throw new MailNaoRegistado("[Error] Id de conta inexistente");

			/* Só teremos um item nesta coleção */
			foreach(DataRow dr in dt.Rows)
			{
				/* Estamos perante um médico */
				if (id.Contains("M"))
				{
					c = this.createMedico(id, dr.Field<string>("nome"), dr.Field<string>("password"),
						dr.Field<string>("email"), dr.Field<DateTime>("dataNascimento"), connection);
				}
				/* Estamos perante um paciente */
				if (id.Contains("P"))
				{
					c = this.createPaciente(id, dr.Field<string>("nome"), dr.Field<string>("password"),
						dr.Field<string>("email"), dr.Field<DateTime>("dataNascimento"), connection);
				}
			}

			this.getContactos(id, c, connection);

			connection.Close();
			return c;
		}
	}
}