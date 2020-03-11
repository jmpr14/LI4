using System;
using MySql.Data.MySqlClient;

namespace ConsultaJaDB
{
	/**
	 * Classe que permite aceder à base de dados 
	 * e extrair informações relacionadas 
	 * com contas
	 */
	public class ContaDAO
	{
		private static ContaDAO inst = null;
		private ContaDAO()
		{
			MySqlConnection msc = new MySqlConnection("");
		}

		/**
		 * Método que permite obter um único 
		 * objeto da classe ContaDAO
		 */
		public ContaDAO getInstance()
		{
			if (ContaDAO.inst == null)
				ContaDAO.inst = new ContaDAO();
			return inst;
		}
	}
}
