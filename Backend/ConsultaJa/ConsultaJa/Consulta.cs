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
		 * Variável que representa o preço 
		 * de toda e qualquer consulta (em centimos)
		 */
		private static int preco = 15000;

		/**
		 * Método que permite alterar o 
		 * preço das consultas
		 */
		public static void alterarPreco(int novoPreco)
		{
			Consulta.preco = novoPreco;
		}

		/**
		 * Construtor para objetos da classe Consulta
		 */
		public Consulta(Paciente p, Medico m, int ano, int mes, int dia, int hora, int min, int sec)
		{
			this.id = -1;
			this.m = m;
			this.p = p;
			this.data_hora = new DateTime(ano, mes, dia, hora, min, sec);
			this.estado = PEDIDO;
		}

		/**
		 * Método que retorna o id da consulta 
		 * à qual é enviado o método
		 */
		public int getID()
		{
			return this.id;
		}

		public Paciente getPaciente()
		{
			return this.p;
		}

		/**
		 * Método que permite marcar uma 
		 * consulta como agendada
		 */
		public void agendar()
		{
			this.estado = AGENDADA;
		}

		/**
		 * Método que permite marcar uma 
		 * consulta como pendente
		 */
		public void pendente() 
		{
			this.estado = PENDENTE;
		}

		/**
		 * Método que permite marcar uma 
		 * consulta como realizada
		 */
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

		/**
		 * Método que permite atribui um valor à variável 
		 * médico de um objeto da classe `Consulta ao qual 
		 * é enviado o método
		 */
		public void setMedico(Medico m)
		{
			this.m = m;
		}
	}
}
