using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.DataEncryption;
using Microsoft.EntityFrameworkCore.DataEncryption.Providers;
using servicios_web_proyecto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Context
{
    public class AppDbContext : DbContext
    {
        private static readonly string encryptionKey = "142eb4a7ab52dbfb971e18daed7056488446b4b2167cf61187f4bbc60fc9d96d";
        private static readonly string initialisationVector = "26744a68b53dd87bb395584c00f7290a";
        private readonly byte[] _encryptionKey = StringToByteArray(encryptionKey);
        private readonly byte[] _encryptionIV = StringToByteArray(initialisationVector);
        private readonly IEncryptionProvider _provider;

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            _provider = new AesProvider(_encryptionKey, _encryptionIV);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Binnacle> Binnacles { get; set; }
        public DbSet<Consecutive> Consecutives { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Port> Ports { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<PaymentsAccount> PaymentsAccounts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseEncryption(_provider);
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

        public static byte[] StringToByteArray(string hex)
        {
            if (hex.Length % 2 == 1)
                throw new Exception("The binary key cannot have an odd number of digits");

            byte[] arr = new byte[hex.Length >> 1];

            for (int i = 0; i < hex.Length >> 1; ++i)
            {
                arr[i] = (byte)((GetHexVal(hex[i << 1]) << 4) + (GetHexVal(hex[(i << 1) + 1])));
            }

            return arr;
        }

        public static int GetHexVal(char hex)
        {
            int val = (int)hex;
            return val - (val < 58 ? 48 : 87);
        }

    }
}
