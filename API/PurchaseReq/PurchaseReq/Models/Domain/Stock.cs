namespace PurchaseReq.Models.Domain
{
    public class Stock
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public required int Code { get; set; }
        public required int Quantity { get; set; }
        public required double Price { get; set; }  
        public DateTime CreatedAt { get; set; }
        public DateTime Updated { get; set; }
    }
}
