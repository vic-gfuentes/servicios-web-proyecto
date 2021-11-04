using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace servicios_web_proyecto.Migrations
{
    public partial class DataStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Binnacles",
                columns: table => new
                {
                    RecordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Log = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Binnacles", x => x.RecordId);
                });

            migrationBuilder.CreateTable(
                name: "Consecutives",
                columns: table => new
                {
                    ConsecutiveId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prefix = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Consecutives", x => x.ConsecutiveId);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    CountryId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ISO = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.CountryId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Airlines",
                columns: table => new
                {
                    AirlineId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CountryId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Airlines", x => x.AirlineId);
                    table.ForeignKey(
                        name: "FK_Airlines_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "CountryId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PaymentsAccounts",
                columns: table => new
                {
                    PaymentsAccountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CVV = table.Column<int>(type: "int", nullable: true),
                    AccountPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentsAccounts", x => x.PaymentsAccountId);
                    table.ForeignKey(
                        name: "FK_PaymentsAccounts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ports",
                columns: table => new
                {
                    PortId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Number = table.Column<int>(type: "int", nullable: false),
                    Available = table.Column<bool>(type: "bit", nullable: false),
                    AirlineId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ports", x => x.PortId);
                    table.ForeignKey(
                        name: "FK_Ports_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "AirlineId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    FlightId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Origin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Destination = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TicketPrice = table.Column<double>(type: "float", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    PortId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.FlightId);
                    table.ForeignKey(
                        name: "FK_Flights_Ports_PortId",
                        column: x => x.PortId,
                        principalTable: "Ports",
                        principalColumn: "PortId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reservations",
                columns: table => new
                {
                    ReservationId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Tickets = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    FlightId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    PaymentsAccountId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservations", x => x.ReservationId);
                    table.ForeignKey(
                        name: "FK_Reservations_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "FlightId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reservations_PaymentsAccounts_PaymentsAccountId",
                        column: x => x.PaymentsAccountId,
                        principalTable: "PaymentsAccounts",
                        principalColumn: "PaymentsAccountId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Airlines",
                columns: new[] { "AirlineId", "CountryId", "Name" },
                values: new object[] { "CT-1", null, "Costa Rican Airlines" });

            migrationBuilder.InsertData(
                table: "Consecutives",
                columns: new[] { "ConsecutiveId", "Name", "Prefix", "Value" },
                values: new object[] { 1, "Default", "CT", 5 });

            migrationBuilder.InsertData(
                table: "Countries",
                columns: new[] { "CountryId", "ISO", "Name" },
                values: new object[] { "CT-0", "CR", "Costa Rica" });

            migrationBuilder.InsertData(
                table: "Flights",
                columns: new[] { "FlightId", "Date", "Destination", "Origin", "PortId", "Status", "TicketPrice" },
                values: new object[] { "CT-3", new DateTime(2021, 11, 3, 19, 42, 54, 150, DateTimeKind.Local).AddTicks(2721), "Colombia", "Costa Rica", null, 1, 1000.0 });

            migrationBuilder.InsertData(
                table: "PaymentsAccounts",
                columns: new[] { "PaymentsAccountId", "AccountNumber", "AccountPassword", "CVV", "Type", "UserId" },
                values: new object[] { 1, "j5eELL2QiNzIhdZFiHb0zA==", null, 123, 2, null });

            migrationBuilder.InsertData(
                table: "Ports",
                columns: new[] { "PortId", "AirlineId", "Available", "Number" },
                values: new object[] { "CT-2", null, true, 1 });

            migrationBuilder.InsertData(
                table: "Reservations",
                columns: new[] { "ReservationId", "FlightId", "PaymentsAccountId", "Status", "Tickets" },
                values: new object[] { "CT-4", null, null, 1, 2 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "Name", "Password", "Role" },
                values: new object[] { 1, "admin@email.com", "Admin", "SADQ4ts8pFEZVYZXW5L+XQ==", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Airlines_CountryId",
                table: "Airlines",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_PortId",
                table: "Flights",
                column: "PortId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentsAccounts_UserId",
                table: "PaymentsAccounts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Ports_AirlineId",
                table: "Ports",
                column: "AirlineId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_FlightId",
                table: "Reservations",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_PaymentsAccountId",
                table: "Reservations",
                column: "PaymentsAccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Binnacles");

            migrationBuilder.DropTable(
                name: "Consecutives");

            migrationBuilder.DropTable(
                name: "Reservations");

            migrationBuilder.DropTable(
                name: "Flights");

            migrationBuilder.DropTable(
                name: "PaymentsAccounts");

            migrationBuilder.DropTable(
                name: "Ports");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Airlines");

            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}
