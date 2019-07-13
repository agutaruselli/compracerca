using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace CompraCerca.DataAccess
{
    public enum ContextType
    {
        MEMORY, SQL
    }

    public class ContextFactory : IDesignTimeDbContextFactory<CompraCercaContext>
    {
        public CompraCercaContext CreateDbContext(string[] args)
        {
            return GetNewContext();
        }

        public static CompraCercaContext GetNewContext(ContextType type = ContextType.SQL)
        {
            var builder = new DbContextOptionsBuilder<CompraCercaContext>();
            DbContextOptions options = null;
            if (type == ContextType.MEMORY)
            {
                options = GetMemoryConfig(builder);
            }
            else
            {
                options = GetSqlConfig(builder);
            }
            return new CompraCercaContext(options);
        }

        private static DbContextOptions GetMemoryConfig(DbContextOptionsBuilder builder)
        {
            builder.UseInMemoryDatabase("NOMBRE DE NUESTRA DB");
            return builder.Options;
        }

        private static DbContextOptions GetSqlConfig(DbContextOptionsBuilder builder)
        {
            
            builder.UseSqlServer(@"server=.;initial catalog=ReportDB;Integrated Security=true");
            return builder.Options;
        }
    }
} 