using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsultaJa.Models
{
    public sealed class ConsultaJaModel
    {
        private List<Conta> contas;
        private int Count = 1;

        public static readonly ConsultaJaModel instance = new ConsultaJaModel();

        static ConsultaJaModel()
        {
        }

        public ConsultaJaModel()
        {
            contas = new List<Conta>();
            Conta c = new Conta();
            c.Nome = "Nelson";
            c.Email = "nelson@sapo.pt";
            c.Password = "nelson";
            c.DataNascimento = new DateTime(1999, 05, 31);
            contas.Add(c);
        }

        public static ConsultaJaModel Instance
        {
            get
            {
                return instance;
            }
        }

        public List<Conta> GetAll()
        {
            return contas;
        }

        public Conta GetById(int id)
        {
            return contas.Where(user => user.Id == id).FirstOrDefault();
        }

        public Conta Create(Conta user)
        {
            user.Id = Count++;
            this.contas.Add(user);

            return user;
        }

        public void Update(int id, Conta c)
        {
            Conta c1 = contas.Where(n => n.Id == id).FirstOrDefault();
            c1.Nome = c.Nome;
            c1.Email = c.Email;
            c1.Password = c.Password;
            c1.DataNascimento = c.DataNascimento;
            c1.Id = c.Id;
        }

        public void Delete(int id)
        {
            contas.RemoveAll(n => n.Id == id);
        }

        public bool login(string email, string password)
        {
            bool valido = false;
            foreach (Conta c in contas)
            {
                if (c.Email.Equals(email) && c.Password.Equals(password)) valido = true;
            }
            if(!valido) throw new PasswordErrada();
            
            return valido;
        }
    }
}
