using Microsoft.EntityFrameworkCore;

namespace ConsultaJa.Models
{
    public class ContaContext : DbContext
    {
        public ContaContext(DbContextOptions<ContaContext> options)
            : base(options)
        {
        }

        public DbSet<Conta> Contas { get; set; }
    }
}
