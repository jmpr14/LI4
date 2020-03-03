﻿using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultaJa
{
    public class Medico : Conta
    {
        /**
         * Estrutura de dados que guarda os 
         * diferentes contactos de cada médico
         */
        List<string> contactos;

        /**
         * Variável que guarda a morada do médico
         */
        string morada;

        /**
         * Variável que guarda o nif do médico
         */
        string nif;

        /**
         * Variável que guarda a classificação 
         * do médico em questão
         */
        double classificacao;

        /**
         * Variável que guarda a quantidade 
         * de classificações feitas ao médico
         */
        int numClassificacoes;

        /**
         * Variável que guarda o saldo 
         * do médico em questão
         */
        int saldo;

        /**
         * Estrutura de dados que guarda o 
         * histórico de consultas do médico
         */
        Dictionary<int, Consulta> historico;

        /**
         * Estrutura de dados que guarda o conjunto 
         * de consultas agendadas para o médico
         */
        Dictionary<int, Consulta> agendadas;

        /**
         * Estrutura de dados que guarda o conjunto 
         * de consultas pendentes para o médico. 
         * Estas consultas são propostas por si 
         * e aguardam aprovação do paciente envolvido 
         * para passarem para agendadas
         */
        Dictionary<int, Consulta> pendentes;

        /**
         * Construtor para objetos 
         * da classe médico
         */
        public Medico(string email, string password, string nome, DateTime dataNascimento, string nif, string morada) : 
            base(email,password,nome,dataNascimento)
        {
            this.nif = nif;
            this.morada = morada;
            this.classificacao = -1; /* Valor que representa ausência de qualquer classificação */
            this.numClassificacoes = 0;
            this.saldo = 0;
            this.contactos = new List<string>();
            this.historico = new Dictionary<int, Consulta>();
            this.agendadas = new Dictionary<int, Consulta>();
            this.pendentes = new Dictionary<int, Consulta>();
        }

        /**
         * Método que retorna o saldo do objeto da 
         * classe Medico ao qual é enviado o método
         */
        public double getSaldo()
        {
            return (double)saldo / 100;
        }

        /**
         * Método que permite adicionar um certo 
         * numerário à carteira digital do médico
         */
        public void pagamento(int numerario)
        {
            this.saldo += numerario;
        }

        /**
         * Método que permite adicionar um contacto 
         * à lista de contactos de um médico
         */
        public void addContacto(string contacto)
        {
            this.contactos.Add(contacto);
        }

        /**
         * Método que permite adicionar uma classificação 
         * ao objeto da classe Medico ao qual é enviado 
         * o método
         */
        public void classificar(double classificacao)
        {
            if (classificacao <= 5 && classificacao >= 0)
            {
                this.classificacao *= (double)this.numClassificacoes;
                this.classificacao += classificacao;
                this.numClassificacoes++;
                this.classificacao /= (double)this.numClassificacoes;
            }
            else
                throw new ClassificacaoInvalida("Classificação Inválida");
        }

        /**
         * Implementação do método ToString 
         * para objetos da classe Medico
         */
        public override string ToString()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("Nif: ");
            sb.Append(this.nif);
            sb.Append("; Morada: ");
            sb.Append(this.morada);
            sb.Append("; Classificação: ");
            sb.Append(this.classificacao);
            sb.Append("; Contactos: {");
            foreach (string s in this.contactos)
            {
                sb.Append(s);
                sb.Append(", ");
            }
            sb.Append("}");
            return sb.ToString();
        }

        /**
         * Método que retorna o histórico 
         * de um dado médico
         */
        public Dictionary<int, Consulta> getHistorico()
        {
            return this.historico;
        }

        public Dictionary<int, Consulta> getConsultasAgendadas()
        {
            return this.agendadas;
        }
    }
}