using Microsoft.EntityFrameworkCore;
using PurchaseReq.Models.Domain;

namespace PurchaseReq.Data
{
    public class PurchaseDbContext : DbContext
    {
        public PurchaseDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Stock> Stocks { get; set; }
    }
}
