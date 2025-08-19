using Microsoft.EntityFrameworkCore;

namespace PurchaseReq.Data
{
    public class PurchaseDbContext : DbContext
    {
        public PurchaseDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<> Stocks { get; set; }
    }
}
