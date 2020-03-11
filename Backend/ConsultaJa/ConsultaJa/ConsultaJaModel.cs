using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultaJa
{
	public class ConsultaJaModel
	{
		/**
		 * Variável de classe que guarda o número 
		 * de médicos inscritos na aplicação
		 */
		private static int nMedicos = 0;

		/**
		 * Variável de classe que guarda o número
		 * de pacientes inscritos na aplicação
		 */
		private static int nPacientes = 0;

		/**
		 * Variável de classe que guarda o número 
		 * de consultas solicitadas por clientes
		 */
		private static int nConsultas = 0;

		/**
		 * Estrutura de dados que guarda todos 
		 * os médicos registados na aplicação
		 */
		private Dictionary<string, Medico> medicos;

		/**
		 * Estrutura de dados que guarda todos 
		 * os pacientes registados na aplicação
		 */
		private Dictionary<string, Paciente> pacientes;

		/**
		 * Estrutura de dados que guarda o conjunto 
		 * de todos os pedidos de consulta solicitados 
		 * por parte de pacientes
		 */
		private Dictionary<int, Consulta> pedidos;

		/**
		 * Variável que guarda a conta com 
		 * direitos de administração
		 */
		private Administrador admin;

		/**
		 * Variável que indica o saldo já angariado 
		 * na administração de consultas para 
		 * pacientes
		 */
		private int saldo;

		/**
		 * Construtor para objetos da classe ConsultaJaModel, 
		 * classe essa que representa a classe principal 
		 * da aplicação
		 */
		public ConsultaJaModel()
		{
			this.medicos = new Dictionary<string, Medico>();
			this.pacientes = new Dictionary<string, Paciente>();
			this.pedidos = new Dictionary<int, Consulta>();
		}

		/**
		 * Método que gere a atribuição de um 
		 * id aquando da criação de uma nova 
		 * conta
		 */
		private string constroiID(Conta c)
		{
			StringBuilder sb = new StringBuilder();
			if (c is Medico)
			{
				sb.Append("M");
				sb.Append(nMedicos++);
				c.setID(sb.ToString());
			}
			else
			{
				sb.Append("P");
				sb.Append(nPacientes++);
				c.setID(sb.ToString());
			}
			return sb.ToString();
		}

		/**
		 * Método que permite a inscrição de 
		 * um novo médico na aplicação
		 */
		private string novoMedico(string nome, string email, string password, List<string> contactos, DateTime dataNascimento, string morada, string nif)
		{
			String ret;
			Medico m = new Medico(email, password, nome, dataNascimento, nif, morada);
			this.medicos.Add((ret = this.constroiID(m)), m);
			return ret;
		}

		/**
		 * Método que permite a inscrição de 
		 * um novo paciente na aplicação
		 */
		public String novoPaciente(string nome, string email, string password, List<string> contactos, DateTime dataNascimento, string morada, string nif)
		{
			String ret;
			Paciente p = new Paciente(email, password, nome, morada, nif, dataNascimento);
			this.pacientes.Add((ret = this.constroiID(p)), p);
			return ret;
		}

		/**
		 * Método que permite fazer login na aplicação
		 */
		public Conta login(string id, string email, string password)
		{
			Conta ret = null;
			if (id.Contains("P")){
				Paciente p;
				if (!this.pacientes.TryGetValue(id, out p))
					throw new MailNaoRegistado("Conta inexistente");

				if (!p.getEmail().Equals(email))
					throw new MailNaoRegistado("Mail introduzido não correspondente");

				if (p != null && !p.getPassword().Equals(password))
					throw new PasswordErrada("Password incorreta");

				ret = p;
			}
			if (id.Contains("M"))
			{
				Medico m;
				if (!this.medicos.TryGetValue(id, out m))
					throw new MailNaoRegistado("Conta inexistente");

				if(!m.getEmail().Equals(email))
					throw new MailNaoRegistado("Mail introduzido não correspondente");

				if (m != null && !m.getPassword().Equals(password))
					throw new PasswordErrada("Password incorreta");

				ret = m;
			}
			return ret;
		}

		/**
		 * Método que permite avaliar um médico 
		 * registado na aplicação, fornecendo o seu ID
		 */
		public void avaliarMedico(string idMedico, int classificacao)
		{
			Medico m;
			if (this.medicos.TryGetValue(idMedico, out m))
				m.classificar(classificacao);
			else throw new MailNaoRegistado("Id de médico a avaliar inexistente");
		}

		/**
		 * Método que permite aceder ao histórico 
		 * de consultas de um médico ou paciente
		 */
		public Dictionary<int, Consulta> getHistorico(string id)
		{
			Dictionary<int, Consulta> ret = null;
			if (id.Contains("M"))
			{
				Medico m;
				if (this.medicos.TryGetValue(id, out m))
					ret = m.getHistorico();
			}
			else
			{
				Paciente p;
				if (this.pacientes.TryGetValue(id, out p))
					ret = p.getHistorico();
			}
			return ret;
		}

		/**
		 * Método que retorna uma estrutura de dados 
		 * contendo informação acerca de todas as 
		 * consultas agendadas de um médico ou paciente
		 */
		public Dictionary<int, Consulta> getConsultasAgendadas(string id)
		{
			Dictionary<int, Consulta> ret = null;
			if (id.Contains("M"))
			{
				Medico m;
				if (this.medicos.TryGetValue(id, out m))
					ret = m.getConsultasAgendadas();
			}
			else
			{
				Paciente p;
				if (this.pacientes.TryGetValue(id, out p))
					ret = p.getConsultasAgendadas();
			}
			return ret;
		}

		/**
		 * Método que permite alterar o 
		 * preço das consultas
		 */
		public void mudarPreco(int novoPreco)
		{
			Consulta.alterarPreco(novoPreco);
		}

		/**
		 * Método que permite a um utilizador 
		 * da aplicação alterar a sua password
		 */
		public void alterarPassword(string id, string password, string novaPass)
		{
			if (id.Contains("M"))
			{
				Medico m;
				if (this.medicos.TryGetValue(id, out m))
					m.alterarPassword(password, novaPass);
				else
					throw new MailNaoRegistado("Conta inexistente");
			}

			if(id.Contains("P"))
			{
				Paciente p;
				if (this.pacientes.TryGetValue(id, out p))
					p.alterarPassword(password, novaPass);
				else 
					throw new MailNaoRegistado("Conta inexistente");
			}
		}

		/**
		 * Método que permite a um paciente solicitar 
		 * uma consulta na aplicação ConsultaJa
		 */
		public void solicitarConsulta(string idPaciente, int ano, int mes, int dia, int hora, int minuto)
		{
			Paciente p;
			if (this.pacientes.TryGetValue(idPaciente, out p)) {
				Consulta c = new Consulta(p, null, ano, mes, dia, hora, minuto, 0);
				/* Atribuimos id à consulta e 
				 * adicionamos aos pedidos */
				c.setID(nConsultas);
				this.pedidos.Add(nConsultas++, c);
			}
		}

		/**
		 * Método que permite a um médico propor 
		 * uma consulta a um paciente, tendo este 
		 * previamente criado uma solicitação de 
		 * consulta
		 */
		public void proporConsulta(int idConsulta, Medico m)
		{
			Consulta c;
			if (this.pedidos.TryGetValue(idConsulta, out c)) {
				this.pedidos.Remove(idConsulta);
				c.setMedico(m);
				c.getPaciente().addPropostaConsulta(c);
			}
		}

		/**
		 * Método que permite aceder a pedidos enviados 
		 * por cliente para marcação de consultas
		 */
		public List<Consulta> getPedidos()
		{
			List<Consulta> ret = new List<Consulta>(); 
			foreach (Consulta c in this.pedidos.Values)
				ret.Add(c);
			return ret;
		}

		/**
		 * Método que permite desmarcar uma 
		 * consulta fornecendo o id do utente 
		 * autenticado e o id da consulta a 
		 * ser desmarcada
		 */
		public void desmarcaConsulta(string id, int idConsulta)
		{
			/* Em primeiro lugar vamos testar se o 
			 * pedido de desmarcação foi feito 
			 * por um médico */
			if (id.Contains("M"))
			{
				Medico m;
				if (this.medicos.TryGetValue(id, out m))
				{
					foreach(Consulta c in m.getConsultasAgendadas().Values)
					{
						if (c.getID().Equals(idConsulta))
							c.desmarcar();
					}

				}
			}
			else
			{
				Paciente p;
				if(this.pacientes.TryGetValue(id, out p))
				{
					foreach(Consulta c in p.getConsultasAgendadas().Values)
					{
						if (c.getID().Equals(idConsulta))
							c.desmarcar();
					}
				}
			}
		}

		/**
		 * Método que permite efetuar carregamento de 
		 * um certo montante na carteira digital do 
		 * paciente cujo id é enviado como parâmetro 
		 * do método
		 */
		public void efetuaCarregamento(string idPaciente, int montante)
		{
			Paciente p;
			if (this.pacientes.TryGetValue(idPaciente, out p))
			{
				p.efetuaCarregamento(montante);
			}
			/* Se o id de paciente não estiver atribuido lançamos exceção */
			else
				throw new MailNaoRegistado("Impossível efetuar carregamento. Conta inexistente.");
		}

		/**
		 * Método que permite fazer um novo 
		 * pedido de inscrição de um médico
		 */
		public void fazerPedidoInscricao(string email, string password, string nome, DateTime dataNascimento, string nif, string morada)
		{
			Medico m = new Medico(email, password, nome, dataNascimento, nif, morada);
			this.admin.fazerPedido(m);
		}

		/**
		 * Método que permite aceitar ou rejeitar um 
		 * pedido de inscrição feito por parte de um médico
		 */
		public string trataPedido(string email, Boolean action)
		{
			string idM = null;
			Medico m = this.admin.removerPedido(email);
			if (action)
			{
				idM = this.novoMedico(m.getNome(), m.getEmail(), m.getPassword(), null, 
					m.getDataNascimento(), m.getMorada(), m.getNif());
			}
			return idM;
		}
	}
}