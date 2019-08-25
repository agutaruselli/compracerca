using CompraCerca.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CompraCerca.DataAccess
{
    public class CompraCercaContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Business> Businesses { get; set; }
        public CompraCercaContext(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().Property(e => e.Id).ValueGeneratedNever();
        }
    }
}
