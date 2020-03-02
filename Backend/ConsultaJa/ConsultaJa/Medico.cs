using System.Collections.Generic;
using System.Text;

namespace ConsultaJa
{
    public class Medico
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
         * Construtor para objetos 
         * da classe médico
         */
        public Medico(string nif, string morada)
        {
            this.nif = nif;
            this.morada = morada;
            this.classificacao = -1; /* Valor que representa ausência de qualquer classificação */
            this.numClassificacoes = 0;
            this.saldo = 0;
            this.contactos = new List<string>();
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
            if (classificacao < 5 && classificacao > 0)
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
            return sb.ToString();
        }
    }
}