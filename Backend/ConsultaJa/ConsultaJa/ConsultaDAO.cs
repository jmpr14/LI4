using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConsultaJa;
using MySql.Data.MySqlClient;

namespace ConsultaJaDB
{
	/**
	 * Classe que permite aceder à base de dados
	 * e extrair informações relacionadas
	 * com contas
	 */
	public class ConsultaDAO
	{
		/**
		 * Variável de instância da classe 
		 * ContaDAO que é retornada quando 
		 * é pedida uma nova instância
		 */
		private static ConsultaDAO inst = null;

		/**
		 * String a partir da qual podemos 
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
		private ConsultaDAO()
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
		public static ConsultaDAO getInstance()
		{
			if (ConsultaDAO.inst == null)
				ConsultaDAO.inst = new ConsultaDAO();
			return ConsultaDAO.inst;
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

			MySqlDataAdapter msda = new MySqlDataAdapter("select * from Consulta", connection);

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
		public bool contains(int id)
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			/* Abrimos a conexão */
			connection.Open();
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();

			sb.Append("select * from Consulta where idConsulta=");
			sb.Append(id);

			/* Fechamos a conexão */
			connection.Close();
			return dt.Rows.Count != 0;
		}

		/**
		 * Método que permite remover uma consulta 
		 * da base de dados fornecendo o seu ID
		 */
		public void remove(int id)
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			/* Abrimos a conexão */
			connection.Open();

			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("delete from Consulta where idConsulta=");
			sb.Append(id);

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);

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
			sbdata.Append(" ");
			sbdata.Append(data.Hour);
			sbdata.Append(":");
			sbdata.Append(data.Minute);
			sbdata.Append(":");
			sbdata.Append(data.Second);
			return sbdata.ToString();
		}

		/**
		 * Método que adiciona um objeto da classe 
		 * consulta à base de dados. É retornado o 
		 * identificador que ficou associado à consulta
		 */
		private void putTableConsulta(Consulta value, MySqlConnection connection)
		{
			int ret=100;

			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("insert into Consulta (data_hora,localidade,morada,estado,preco,observaçoes,idPaciente,idMedico) values ('");
			sb.Append(this.criarData(value.getData_Hora()));
			sb.Append("','");
			sb.Append(value.getLocalidade());
			sb.Append("','");
			sb.Append(value.getMorada());
			sb.Append("','");
			sb.Append(value.getEstado());
			sb.Append("',");
			sb.Append(value.getPrecoUni());
			sb.Append(",'");
			if (value.getObservacoes() == null)
				sb.Append("Sem observações");
			else
				sb.Append(value.getObservacoes());
			sb.Append("','");
			sb.Append(value.getPaciente().getID());
			sb.Append("','");
			sb.Append(value.getMedico().getID());
			sb.Append("')");

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);
		}

		/**
		 * Método que permite adicionar uma nova consulta
		 * à base de dados, tendo fornecido o seu 
		 * identificador e o próprio objeto consulta
		 */
		public void put(Consulta value)
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			/* Abrimos a conexão */
			connection.Open();

			/* Colocar a informação
			 * na tabela consulta */
			this.putTableConsulta(value, connection);

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
			foreach (DataRow dr in dt.Rows)
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
			foreach (DataRow dr in dt.Rows)
			{
				c.addContacto(dr.Field<string>("telemovel"));
			}
		}

		/**
		 * Método que permite obter um objeto 
		 * da classe Conta fornecendo o seu id
		 */
		private Conta getConta(string id, MySqlConnection connection)
		{
			Conta c = null;
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
			foreach (DataRow dr in dt.Rows)
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
						dr.Field<string>("email"), dr.Field<DateTime>("dataNascimento"),connection);
				}
			}

			this.getContactos(id, c, connection);

			return c;
		}

		/**
		 * Método que permite obter uma consulta 
		 * acedendo à tabela consulta existente 
		 * na base de dados
		 */
		private Consulta getFromTableConsulta(int id, MySqlConnection connection)
		{
			Consulta ret = null;
			DataTable dt = new DataTable();

			StringBuilder sb = new StringBuilder();
			sb.Append("select * from Consulta where idConsulta=");
			sb.Append(id);

			MySqlDataAdapter msda = new MySqlDataAdapter(sb.ToString(), connection);

			msda.Fill(dt);

			if (dt.Rows.Count == 0)
				throw new MailNaoRegistado("[Error] Id de consulta não está atribuido");

			/* Só teremos um item nesta coleção */
			foreach (DataRow dr in dt.Rows)
			{
				Medico m = (Medico)this.getConta(dr.Field<string>("idMedico"), connection);
				Paciente p = (Paciente)this.getConta(dr.Field<string>("idPaciente"), connection);
				DateTime dta = dr.Field<DateTime>("data_hora");
				string obs = dr.Field<string>("observaçoes");
				if (obs.Equals("Sem observações"))
					obs = null;

				ret = new Consulta(dr.Field<int>("idConsulta"),p, m, dr.Field<string>("localidade"), dr.Field<string>("morada"), obs,
					dta.Year, dta.Month, dta.Day, dta.Hour, dta.Minute, dta.Second);
			}

			return ret;
		}

		/**
		 * Método que permite obter um objeto da 
		 * classe Consulta proveniente do seu 
		 * acesso na base de dados
		 */
		public Consulta get(int id)
		{
			MySqlConnection connection = new MySqlConnection(this.connectionstring);
			/* Abrimos a conexão */
			connection.Open();

			Consulta c = this.getFromTableConsulta(id, connection);

			/* Fechamos a conexão */
			connection.Close();

			return c;
		}
	}
}
