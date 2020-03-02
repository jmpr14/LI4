using System;

namespace ConsultaJa
{
	public class Consulta
	{
		/**
		 * Valores que caracterizam o estado 
		 * de uma consulta
		 */
		private static readonly int PEDIDO = 3;
		private static readonly int PENDENTE = 1;
		private static readonly int AGENDADA = 2;
		private static readonly int REALIZADA = 0;

		/**
		 * Variável que identifica univocamente 
		 * uma consulta
		 */
		private int id;

		/**
		 * Paciente ao qual a consulta 
		 * é administrada
		 */
		private Paciente p;

		/**
		 * Médico responsável por administrar 
		 * a consulta
		 */
		private Medico m;

		/**
		 * Momento da realização da consulta
		 */
		private DateTime data_hora;

		/**
		 * Variável que define o estado 
		 * da consulta
		 */
		private int estado;

		/**
		 * Construtor para objetos da classe Consulta
		 */
		public Consulta(Paciente p, DateTime data_hora)
		{
			this.id = -1;
			this.m = null;
			this.p = p;
			this.data_hora = data_hora;
			this.estado = PEDIDO;
		}

		public void agendar()
		{
			this.estado = AGENDADA;
		}

		public void pendente() 
		{
			this.estado = PENDENTE;
		}

		public void realizar()
		{
			this.estado = REALIZADA;
		}

		/**
		 * Método que permite associar um médico a uma 
		 * consulta, visto que no princípio tal não é feito, 
		 * tendo em conta que no princípio temos apenas um 
		 * pedido de consulta feito por parte de um cliente
		 */
		public void associaMedico(Medico m)
		{
			this.m = m;
		}

		/**
		 * Método que permite associar um id a uma 
		 * consulta aquando do seu registo no sistema
		 */
		public void setID(int id)
		{
			this.id = id;
		}
	}
}
