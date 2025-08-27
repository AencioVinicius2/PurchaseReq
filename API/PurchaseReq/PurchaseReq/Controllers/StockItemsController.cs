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

        [HttpPost]
        public async Task<IActionResult> AddStockItem(AddStockItemDTO request)
        {
            var LastCode = await dbContext.Stocks.MaxAsync(x => x.Code);
            LastCode++;
            var Item = new Stock
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Description = request.Description,
                Code = LastCode++,
                Quantity = request.Quantity,
                Price = request.Price,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            };

            var existItem = await dbContext.Stocks.FirstOrDefaultAsync(x => x.Code == Item.Code);
            if (existItem?.Code is null)
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

            }
            else
            {
                return BadRequest("Item code must be unique.");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStockItems()
        {
            var items = await dbContext.Stocks.ToListAsync();
            if(items is null)
            {
                return NotFound(items);
            }
            return Ok(items);
        }

        [HttpGet]
        [Route("{code}")]
        public async Task<IActionResult> GetStockItem(int code)
        {
            var item = await dbContext.Stocks.FirstOrDefaultAsync(x => x.Code == code);
            if (item is null) {
                return NotFound(item);
            }
            return Ok(item);
        }

        [HttpPut]
        [Route("{code}")]
        public async Task<IActionResult> UpdateStockItem(int code, UpdateStockItemDTO itemUpdate)
        {
            var item = await dbContext.Stocks.FirstOrDefaultAsync(x => x.Code == code);
            if (item is null)
            {
                return NotFound(item);
            }
            else if (itemUpdate.Quantity >= 1)
            {
                item.Name = itemUpdate.Name;
                item.Description = itemUpdate.Description;
                item.Quantity = itemUpdate.Quantity;
                item.Price = itemUpdate.Price;
                item.UpdatedAt = DateTime.Now;

                dbContext.SaveChanges();

                return Ok(item);
            }
            else
            {
                return BadRequest("Quantity must be at least 1.");
            }

        }

        [HttpDelete]
        [Route("{code}")]
        public async Task<IActionResult> DeleteStockItem(int code)
        {
            var item = await dbContext.Stocks.FirstOrDefaultAsync(x => x.Code == code);
            if(item is null)
            {
                return NotFound(item);
            }
            else
            {
                dbContext.Remove(item);
                dbContext.SaveChanges();

                return Ok(item);
            }
        }



    }
}
