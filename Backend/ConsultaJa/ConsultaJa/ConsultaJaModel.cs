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
		private Dictionary<string, Conta> contas;

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
			this.contas = new Dictionary<string, Conta>();
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
		public string novoMedico(string nome, string email, string password, List<string> contactos, DateTime dataNascimento, string morada, string nif, string codigo_postal)
		{
			String ret;
			Medico m = new Medico("", email, password, nome, dataNascimento, nif, morada, codigo_postal);
			this.contas.Add((ret = this.constroiID(m)), m);
			m.setID(ret);
			return ret;
		}

		/**
		 * Método que permite a inscrição de 
		 * um novo paciente na aplicação
		 */
		public string novoPaciente(string nome, string email, string password, List<string> contactos, DateTime dataNascimento, string morada, string nif, string codigo_postal)
		{
			String ret;
			Paciente p = new Paciente("", email, password, nome, morada, nif, dataNascimento, codigo_postal);
			this.contas.Add((ret = this.constroiID(p)), p);
			p.setID(ret);
			return ret;
		}

		/**
		 * Método que permite fazer login na aplicação
		 */
		public Conta login(string id, string email, string password)
		{
			Conta ret = null;

			if (!this.contas.TryGetValue(id, out ret))
				throw new MailNaoRegistado("Conta inexistente");

			if (!ret.getEmail().Equals(email))
				throw new MailNaoRegistado("Mail introduzido não correspondente");

			if (ret != null && !ret.getPassword().Equals(password))
				throw new PasswordErrada("Password incorreta");

			return ret;
		}

		/**
		 * Método que permite avaliar um médico 
		 * registado na aplicação, fornecendo o seu ID
		 */
		public void avaliarMedico(string idMedico, int classificacao)
		{
			Conta c;
			if (this.contas.TryGetValue(idMedico, out c) && c is Medico)
				((Medico)c).classificar(classificacao);
			else 
				throw new MailNaoRegistado("Id de médico a avaliar inexistente");
		}

		/**
		 * Método que permite aceder ao histórico 
		 * de consultas de um médico ou paciente
		 */
		public Dictionary<int, Consulta> getHistorico(string id)
		{
			Dictionary<int, Consulta> ret = null;
			Conta c;
			if (this.contas.TryGetValue(id, out c))
				ret = c.getHistorico();
			else
				throw new MailNaoRegistado("Id fornecido não é válido!");
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
			Conta c;
			if (this.contas.TryGetValue(id, out c))
				ret = c.getConsultasAgendadas();
			else
				throw new MailNaoRegistado("Id fornecido não é válido!");
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
			Conta c;
			if (this.contas.TryGetValue(id, out c))
				c.alterarPassword(password, novaPass);
			else
				throw new MailNaoRegistado("Id fornecido não é válido!");
		}

		/**
		 * Método que permite a um paciente solicitar 
		 * uma consulta na aplicação ConsultaJa
		 */
		public void solicitarConsulta(string idPaciente, int ano, int mes, int dia, int hora, int minuto)
		{
			Conta cc;
			if (this.contas.TryGetValue(idPaciente, out cc) && cc is Paciente)
			{
				Consulta c = new Consulta(nConsultas-1, (Paciente)cc, null, null, null, null, ano, mes, dia, hora, minuto, 0);
				/* Atribuimos id à consulta e 
				 * adicionamos aos pedidos */
				c.setID(nConsultas);
				this.pedidos.Add(nConsultas++, c);
			}
			else
				throw new MailNaoRegistado("Não existe um paciente com esse id!");
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
			Conta c;
			if(this.contas.TryGetValue(id, out c))
				foreach(Consulta cc in c.getConsultasAgendadas().Values)
				{
					if (cc.getID().Equals(idConsulta))
						cc.desmarcar();
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
			Conta c;
			if (this.contas.TryGetValue(idPaciente, out c) && c is Paciente)
			{
				((Paciente)c).efetuaCarregamento(montante);
			}
			/* Se o id de paciente não estiver 
			 * atribuido lançamos exceção 
			 */
			else
				throw new MailNaoRegistado("Impossível efetuar carregamento. Conta de paciente inexistente.");
		}

		/**
		 * Método que permite fazer um novo
		 * pedido de inscrição de um médico
		 */
		public void fazerPedidoInscricao(string email, string password, string nome, DateTime dataNascimento, string nif, string morada, string codigo_postal)
		{
			Medico m = new Medico("", email, password, nome, dataNascimento, nif, morada,codigo_postal);
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
					m.getDataNascimento(), m.getMorada(), m.getNif(), m.getCodigo_Postal());
			}
			return idM;
		}
	}
}