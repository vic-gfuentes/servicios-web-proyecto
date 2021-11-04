﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using servicios_web_proyecto.Context;

namespace servicios_web_proyecto.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.10")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("servicios_web_proyecto.Models.Airline", b =>
                {
                    b.Property<string>("AirlineId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("CountryId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AirlineId");

                    b.HasIndex("CountryId");

                    b.ToTable("Airlines");

                    b.HasData(
                        new
                        {
                            AirlineId = "CT-1",
                            Name = "Costa Rican Airlines"
                        });
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Binnacle", b =>
                {
                    b.Property<int>("RecordId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Log")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("RecordId");

                    b.ToTable("Binnacles");
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Consecutive", b =>
                {
                    b.Property<int>("ConsecutiveId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prefix")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Value")
                        .HasColumnType("int");

                    b.HasKey("ConsecutiveId");

                    b.ToTable("Consecutives");

                    b.HasData(
                        new
                        {
                            ConsecutiveId = 1,
                            Name = "Default",
                            Prefix = "CT",
                            Value = 5
                        });
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Country", b =>
                {
                    b.Property<string>("CountryId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ISO")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CountryId");

                    b.ToTable("Countries");

                    b.HasData(
                        new
                        {
                            CountryId = "CT-0",
                            ISO = "CR",
                            Name = "Costa Rica"
                        });
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Flight", b =>
                {
                    b.Property<string>("FlightId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Destination")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Origin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PortId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<double>("TicketPrice")
                        .HasColumnType("float");

                    b.HasKey("FlightId");

                    b.HasIndex("PortId");

                    b.ToTable("Flights");

                    b.HasData(
                        new
                        {
                            FlightId = "CT-3",
                            Date = new DateTime(2021, 11, 3, 19, 42, 54, 150, DateTimeKind.Local).AddTicks(2721),
                            Destination = "Colombia",
                            Origin = "Costa Rica",
                            Status = 1,
                            TicketPrice = 1000.0
                        });
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.PaymentsAccount", b =>
                {
                    b.Property<int>("PaymentsAccountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AccountNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AccountPassword")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("CVV")
                        .HasColumnType("int");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("PaymentsAccountId");

                    b.HasIndex("UserId");

                    b.ToTable("PaymentsAccounts");

                    b.HasData(
                        new
                        {
                            PaymentsAccountId = 1,
                            AccountNumber = "j5eELL2QiNzIhdZFiHb0zA==",
                            CVV = 123,
                            Type = 2
                        });
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Port", b =>
                {
                    b.Property<string>("PortId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AirlineId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Available")
                        .HasColumnType("bit");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.HasKey("PortId");

                    b.HasIndex("AirlineId");

                    b.ToTable("Ports");

                    b.HasData(
                        new
                        {
                            PortId = "CT-2",
                            Available = true,
                            Number = 1
                        });
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Reservation", b =>
                {
                    b.Property<string>("ReservationId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FlightId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int?>("PaymentsAccountId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int>("Tickets")
                        .HasColumnType("int");

                    b.HasKey("ReservationId");

                    b.HasIndex("FlightId");

                    b.HasIndex("PaymentsAccountId");

                    b.ToTable("Reservations");

                    b.HasData(
                        new
                        {
                            ReservationId = "CT-4",
                            Status = 1,
                            Tickets = 2
                        });
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Email = "admin@email.com",
                            Name = "Admin",
                            Password = "SADQ4ts8pFEZVYZXW5L+XQ==",
                            Role = 1
                        });
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Airline", b =>
                {
                    b.HasOne("servicios_web_proyecto.Models.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryId");

                    b.Navigation("Country");
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Flight", b =>
                {
                    b.HasOne("servicios_web_proyecto.Models.Port", "Port")
                        .WithMany()
                        .HasForeignKey("PortId");

                    b.Navigation("Port");
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.PaymentsAccount", b =>
                {
                    b.HasOne("servicios_web_proyecto.Models.User", "User")
                        .WithMany("PaymentsAccounts")
                        .HasForeignKey("UserId");

                    b.Navigation("User");
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Port", b =>
                {
                    b.HasOne("servicios_web_proyecto.Models.Airline", "Airline")
                        .WithMany("Ports")
                        .HasForeignKey("AirlineId");

                    b.Navigation("Airline");
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Reservation", b =>
                {
                    b.HasOne("servicios_web_proyecto.Models.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId");

                    b.HasOne("servicios_web_proyecto.Models.PaymentsAccount", "PaymentsAccount")
                        .WithMany()
                        .HasForeignKey("PaymentsAccountId");

                    b.Navigation("Flight");

                    b.Navigation("PaymentsAccount");
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Airline", b =>
                {
                    b.Navigation("Ports");
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.User", b =>
                {
                    b.Navigation("PaymentsAccounts");
                });
#pragma warning restore 612, 618
        }
    }
}
