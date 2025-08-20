using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PurchaseReq.Data;
using PurchaseReq.Models;
using PurchaseReq.Models.Domain;
using System.Globalization;

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
        public async Task<IActionResult> AddStockItem(AddStockItemDTO request)
        {
            var Item = new Stock { 
                Id = Guid.NewGuid(), 
                Name = request.Name,
                Description = request.Description,
                Code = request.Code,
                Quantity = request.Quantity,
                Price = request.Price,
                CreatedAt = DateTime.Now,
                Updated = DateTime.Now,
            };

            var existItem = await dbContext.Stocks.FirstOrDefaultAsync(x => x.Code == Item.Code);
            if(existItem?.Code is null)
            {
                if (Item.Quantity >= 1)
                {
                    await dbContext.Stocks.AddAsync(Item);
                    await dbContext.SaveChangesAsync();
                    return Ok(request);
                }
                else
                {
                    return BadRequest("Quantity must be at least 1.");
                }

            } else
            {
                return BadRequest("Item code must be unique.");
            }
        }
    }
}
