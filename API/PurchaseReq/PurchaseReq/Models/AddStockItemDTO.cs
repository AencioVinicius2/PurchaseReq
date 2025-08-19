namespace PurchaseReq.Models
{
    public class AddStockItemDTO
    {
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required int Code { get; set; }
        public int Quantity { get; set; }
    }
}
