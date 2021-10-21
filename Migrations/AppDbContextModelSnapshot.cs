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

                    b.Property<string>("LocationCountryId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AirlineId");

                    b.HasIndex("LocationCountryId");

                    b.ToTable("Airlines");
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
                            Name = "Countries",
                            Prefix = "CT",
                            Value = 1
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

                    b.Property<string>("AirlineId")
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

                    b.HasKey("FlightId");

                    b.HasIndex("AirlineId");

                    b.HasIndex("PortId");

                    b.ToTable("Flights");
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
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Reservation", b =>
                {
                    b.Property<string>("ReservationId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AirlineId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FlightId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ReservationId");

                    b.HasIndex("AirlineId");

                    b.HasIndex("FlightId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
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
                            Password = "password",
                            Role = 1
                        });
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Airline", b =>
                {
                    b.HasOne("servicios_web_proyecto.Models.Country", "Location")
                        .WithMany()
                        .HasForeignKey("LocationCountryId");

                    b.Navigation("Location");
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Flight", b =>
                {
                    b.HasOne("servicios_web_proyecto.Models.Airline", "Airline")
                        .WithMany()
                        .HasForeignKey("AirlineId");

                    b.HasOne("servicios_web_proyecto.Models.Port", "Port")
                        .WithMany()
                        .HasForeignKey("PortId");

                    b.Navigation("Airline");

                    b.Navigation("Port");
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
                    b.HasOne("servicios_web_proyecto.Models.Airline", "Airline")
                        .WithMany()
                        .HasForeignKey("AirlineId");

                    b.HasOne("servicios_web_proyecto.Models.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId");

                    b.HasOne("servicios_web_proyecto.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Airline");

                    b.Navigation("Flight");

                    b.Navigation("User");
                });

            modelBuilder.Entity("servicios_web_proyecto.Models.Airline", b =>
                {
                    b.Navigation("Ports");
                });
#pragma warning restore 612, 618
        }
    }
}
