using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PurchaseReq.Data;

namespace PurchaseReq.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockItemsController : ControllerBase
    {
        private readonly PurchaseDbContext dbContext;
        public StockItemsController(PurchaseDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStockItems()
        {
            var items = await dbContext.Stocks.ToListAsync();
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> AddStockItem()
        {

        }
    }
}
