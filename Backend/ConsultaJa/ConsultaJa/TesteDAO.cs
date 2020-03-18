using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConsultaJaDB;

namespace ConsultaJa
{
    class TesteDAO
    {
        /**
         * Método que permite registar um novo
         * médico na base de dados
         */
        public static void registaMedico(ContaDAO cdao)
        {
            Medico m = new Medico("M0","joaocosta1991@gmail.com", "amanhaesexta", "João Pedro Costa",
                    new DateTime(1991, 2, 28), "245788193", "Rua da Escola", "4730-280");
            m.addContacto("919978113");
            m.addContacto("931254778");
            m.addContacto("911411212");
            cdao.put("M0", m);
        }

        /**
         * Método que permite registar um novo
         * cliente na base de dados
         */
        public static void registaPaciente(ContaDAO cdao)
        {
            Paciente p = new Paciente("P0", "carlosSilvaa@hotmail.com", "carlosSSilva1994",
                    "Carlos Santos Silva", "Rua de Baixo nº155", "784512231", new DateTime(1994, 5, 24),
                    "4730-280");
            p.addContacto("935425789");
            p.addContacto("917747257");
            cdao.put("P0", p);
        }

        /**
         * Método que permite adicionar uma consulta 
         * fornecendo os dois id's quer de médico 
         * quer de paciente
         */
        public static void registarConsulta(ConsultaDAO consdao, ContaDAO cdao, 
            string idPaciente, string idMedico)
        {
            Medico m = (Medico)cdao.get("M0");
            Console.WriteLine("Id do médico da consulta: " + m.getID());
            Paciente p = (Paciente)cdao.get("P0");
            Console.WriteLine("Id do paciente da consulta: " + p.getID());
            Consulta c = new Consulta(0, p, m, "Braga", "Rua de Cima", null, 2020, 05, 25, 16, 30, 00);
            consdao.put(c);
        }

        /**
         * Método que imprime uma lista para o ecrã
         */
        public static void printList(string title, List<string> list)
        {
            StringBuilder sb = new StringBuilder();
            Console.WriteLine(title + ": {");
            int i = 0;
            foreach(string s in list)
            {
                if (i != 0)
                    sb.Append(",");
                sb.Append(s);
                Console.WriteLine(sb.ToString());
                sb.Clear();
                i++;
            }
            Console.WriteLine("}");
        }

        /**
         * Método que arranca o programa 
         * de teste
         */
        public static void Main(string[] args)
        {
            ContaDAO cdao = ContaDAO.getInstance();
            InfoGeralDAO igdao = InfoGeralDAO.getInstance();
            ConsultaDAO consdao = ConsultaDAO.getInstance();
            try
            {
                //registaPaciente(cdao);
                //registaMedico(cdao);
                Conta c = cdao.get("M0");
                Console.WriteLine(c.ToString());
                Console.WriteLine("Size: " + cdao.size());
                //registarConsulta(consdao, cdao, "P0", "M0");
                Console.WriteLine(consdao.get(7).ToString());
                //igdao.put("P0", "Alergias", "Bruffen");
                //igdao.put("P0", "Alergias", "Paracetemol");
                //igdao.put("P0", "Alergias", "Insetos");
                //igdao.put("P0", "Tipo de Sangue", "O(-)");
                printList("Alergias de P0", igdao.get("P0", "Alergias"));
            }
            catch(MailNaoRegistado exc)
            {
                Console.WriteLine(exc.Message);
            }
        }
    }
}