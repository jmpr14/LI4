using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultaJa {
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
		 * de todas as consultas agendadas
		 */
		private Dictionary<int, Consulta> agendadas;

		/**
		 * Estrutura de dados que guarda o conjunto 
		 * de todos os pedidos de consulta solicitados 
		 * por parte de pacientes
		 */
		private Dictionary<int, Consulta> pedidos;

		/**
		 * Construtor para objetos da classe ConsultaJaModel, 
		 * classe essa que representa a classe principal 
		 * da aplicação
		 */
		public ConsultaJaModel()
		{
			this.medicos = new Dictionary<string, Medico>();
			this.pacientes = new Dictionary<string, Paciente>();
			this.agendadas = new Dictionary<int, Consulta>();
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
			if(c is Medico)
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
		public void novoMedico(string nome, string email, string password, List<string> contactos, DateTime dataNascimento, string morada, string nif)
		{
			Medico m = new Medico(email, password, nome, dataNascimento, nif, morada);
			this.medicos.Add(this.constroiID(m), m);
		}

		/**
		 * Método que permite a inscrição de 
		 * um novo paciente na aplicação
		 */
		public void novoPaciente(string nome, string email, string password, List<string> contactos, DateTime dataNascimento, string morada, string nif)
		{
			Paciente p = new Paciente(email, password, nome, morada, nif, dataNascimento);
			this.pacientes.Add(this.constroiID(p), p);
		}
	}

}