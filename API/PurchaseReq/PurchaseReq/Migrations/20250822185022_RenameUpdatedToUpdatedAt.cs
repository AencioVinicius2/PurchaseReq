using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PurchaseReq.Migrations
{
    /// <inheritdoc />
    public partial class RenameUpdatedToUpdatedAt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Updated",
                table: "Stocks",
                newName: "UpdatedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Stocks",
                newName: "Updated");
        }
    }
}
