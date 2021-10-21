using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Binnacle> Binnacles { get; set; }
        public DbSet<Consecutive> Consecutives { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = 1,
                    Email = "admin@email.com",
                    Name = "Admin",
                    Password = "password",
                    Role = Models.Attributes.UserRole.Admin
                }
            );

            modelBuilder.Entity<Consecutive>().HasData(
                new Consecutive
                {
                    ConsecutiveId = 1,
                    Name = "Countries",
                    Prefix = "CT",
                    Value = 1
                }
            );

            modelBuilder.Entity<Country>().HasData(
                new Country
                {
                    CountryId = "CT-0",
                    Name = "Costa Rica",
                    ISO = "CR"
                }
            );
        }
    }
}
