using System;
using System.Collections.Generic;
using System.Text;
using ConsultaJaDB;

namespace ConsultaJa
{
	public class ConsultaJaModel
	{
		/**
		 * Variável de leitura que guarda o nome do 
		 * parâmetro que guarda o preço da consulta na base de dados
		 */
		private static readonly string __Const_preco = "preco";

		/**
		 * Coleção na qual guardamos as contas que 
		 * se inscrevem na plataforma. Essa coleção 
		 * tem por base uma base de dados do tipo Relacional
		 */
		private ContaDAO contas;

		/**
		 * Coleção na qual guardamos todos os registos 
		 * relacionados com consultas que se encontram na plataforma.
		 * Essa coleção tem por base uma base de dados do tipo Relacional
		 */
		private ConsultaDAO consultas;

		/**
		 * Coleção na qual guardamos alguns dos parâmetros 
		 * necessários para o funcionamento normal da 
		 * aplicação, nomeadamente o número de médicos 
		 * e pacientes registados na aplicação, o preço 
		 * das consultas, a chave de acesso a direitos 
		 * administrativos, entre outros
		 */
		private ConfigsDAO parametros;

		/**
		 * Construtor para objetos da classe ConsultaJaModel, 
		 * classe essa que representa a classe principal 
		 * da aplicação
		 */
		public ConsultaJaModel()
		{
			this.contas = ContaDAO.getInstance();
			this.consultas = ConsultaDAO.getInstance();
			this.parametros = ConfigsDAO.getInstance();
		}

		/**
		 * Método que permite a inscrição de 
		 * um novo médico na aplicação
		 */
		public string novoMedico(string nome, string email, string password, List<string> contactos, DateTime dataNascimento, string morada, string nif, string codigo_postal)
		{
			return "";
		}

		/**
		 * Método que permite a inscrição de 
		 * um novo paciente na aplicação
		 */
		public string novoPaciente(string email, string password, string nome, DateTime dataNascimento, 
			string morada, string nif, string codigo_postal, List<string> contactos, string localidade)
		{
			/* Vamos buscar o próximo idPaciente que será atribuido 
			 * ao novo paciente que está a ser registado */
			int id = parametros.getAndIncrement("pacientes");
			string idPaciente = "P" + id;
			Paciente p = new Paciente(idPaciente, email, password, nome, morada, nif,
				dataNascimento, codigo_postal, localidade);
			/* Adicionamos cada contacto ao perfil do paciente */
			foreach(string contacto in contactos)
			{
				p.addContacto(contacto);
			}
			contas.put(idPaciente, p);
			return idPaciente;
		}

		/**
		 * Método que permite fazer login na aplicação. Throws Exception
		 */
		public Conta login(string id, string email, string password)
		{
			if (!this.contas.contains(id))
				throw new MailNaoRegistado("[Error] id '" + id + "' inválido");

			Conta c = this.contas.get(id);

			if (!c.getEmail().Equals(email))
				throw new MailNaoRegistado("[Error] email '" + email + "' não corresponde ao seu id");

			if (!c.getPassword().Equals(password))
				throw new PasswordErrada("[Error] password errada");

			return c;
		}

		/**
		 * Método que permite avaliar um médico 
		 * registado na aplicação, fornecendo o seu ID
		 */
		public void avaliarMedico(string idMedico, int classificacao)
		{
			/* Avaliamos o médico */
			this.contas.avaliarMedico(idMedico, classificacao);
		}

		/**
		 * Método que permite aceder ao histórico 
		 * de consultas de um médico ou paciente
		 */
		public List<Consulta> getHistorico(string id)
		{
			if (!contas.contains(id))
				throw new MailNaoRegistado("[Error] Conta inexistente");

			return contas.get(id).getHistorico();
		}

		/**
		 * Método que retorna uma estrutura de dados 
		 * contendo informação acerca de todas as 
		 * consultas agendadas de um médico ou paciente
		 */
		public List<Consulta> getConsultasAgendadas(string id)
		{
			if (!contas.contains(id))
				throw new MailNaoRegistado("[Error] Conta inexistente");

			return contas.get(id).getConsultasAgendadas();
		}

		/**
		 * Método que permite alterar o 
		 * preço das consultas
		 */
		public void mudarPreco(int novoPreco)
		{
			/* Alteramos o valor na base de dados */
			this.parametros.setValue(__Const_preco, novoPreco);
		}

		/**
		 * Método que permite a um utilizador 
		 * da aplicação alterar a sua password
		 */
		public void alterarPassword(string id, string password, string novaPass)
		{
			Conta c = this.contas.get(id);

			// TERMINAR
		}

		/**
		 * Método que permite a um paciente solicitar 
		 * uma consulta na aplicação ConsultaJa
		 */
		public void solicitarConsulta(string idPaciente, int ano, int mes, int dia, int hora, int minuto)
		{
			Paciente p;
			(p = (Paciente)this.contas.get(idPaciente)).addPropostaConsulta(p.getCodigo_Postal(), 
				ano, mes, dia, hora, minuto, 0);
		}

		/**
		 * Método que permite a um médico propor 
		 * uma consulta a um paciente, tendo este 
		 * previamente criado uma solicitação de 
		 * consulta
		 */
		public void proporConsulta(string idMedico, int idConsulta)
		{
			Medico m;
			/* Vamos a base de dados buscar o preço por 
			 * consulta atualmente em vigor */
			int preco = this.parametros.get(__Const_preco);
			(m = (Medico)this.contas.get(idMedico)).submeterProposta(idConsulta, preco);
		}

		/**
		 * Método que permite aceder a pedidos enviados 
		 * por cliente para marcação de consultas
		 */
		public List<Consulta> getPedidos()
		{
			return new List<Consulta>();
			// TERMINAR
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
			 // FALTA GERIR A DESMARCAÇÃO DE CONSULTAS
		}

		/**
		 * Método que permite efetuar carregamento de 
		 * um certo montante na carteira digital do 
		 * paciente cujo id é enviado como parâmetro 
		 * do método
		 */
		public void efetuaCarregamento(string idPaciente, int montante)
		{
			if (!this.contas.contains(idPaciente))
				throw new MailNaoRegistado("[Error] Id de usuário não se encontra atribuido");

			/* Se a conta existir efetuamos o carregamento */
			this.contas.efetuarCarregamento(idPaciente, montante);
		}

		/**
		 * Método que permite fazer um novo
		 * pedido de inscrição de um médico
		 */
		public void fazerPedidoInscricao(string email, string password, string nome, DateTime dataNascimento, string nif, string morada, string codigo_postal)
		{
			//Medico m = new Medico("", email, password, nome, dataNascimento, nif, morada,codigo_postal);
			// TERMINAR
		}

		/**
		 * Método que permite aceitar ou rejeitar um 
		 * pedido de inscrição feito por parte de um médico
		 */
		public string trataPedido(string email, Boolean action)
		{
			return ""; // TERMINAR 
		}
	}
}