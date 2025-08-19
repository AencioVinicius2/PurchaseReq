namespace PurchaseReq.Models
{
    public class AddStockItemDTO
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public required int Code { get; set; }
        public required int Quantity { get; set; }
    }
}
