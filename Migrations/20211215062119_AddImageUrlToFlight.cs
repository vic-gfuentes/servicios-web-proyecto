using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace servicios_web_proyecto.Migrations
{
    public partial class AddImageUrlToFlight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Flights",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Flights",
                keyColumn: "FlightId",
                keyValue: "CT-3",
                columns: new[] { "Date", "ImageUrl" },
                values: new object[] { new DateTime(2021, 12, 15, 0, 21, 19, 468, DateTimeKind.Local).AddTicks(6296), "https://cdn.colombia.com/images/v2/colombia-info/informacion/informacion-800.jpg" });

            migrationBuilder.UpdateData(
                table: "PaymentsAccounts",
                keyColumn: "PaymentsAccountId",
                keyValue: 1,
                columns: new[] { "AccountNumber", "AccountPassword" },
                values: new object[] { "j5eELL2QiNzIhdZFiHb0zA==", null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "SADQ4ts8pFEZVYZXW5L+XQ==");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Flights");

            migrationBuilder.UpdateData(
                table: "Flights",
                keyColumn: "FlightId",
                keyValue: "CT-3",
                column: "Date",
                value: new DateTime(2021, 11, 11, 21, 5, 47, 58, DateTimeKind.Local).AddTicks(5405));

            migrationBuilder.UpdateData(
                table: "PaymentsAccounts",
                keyColumn: "PaymentsAccountId",
                keyValue: 1,
                columns: new[] { "AccountNumber", "AccountPassword" },
                values: new object[] { "j5eELL2QiNzIhdZFiHb0zA==", null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                column: "Password",
                value: "SADQ4ts8pFEZVYZXW5L+XQ==");
        }
    }
}
