using AngularTest.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularTest.Data;

public class UserDbContext: DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }

    public UserDbContext(DbContextOptions<UserDbContext> options):base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasMany(x => x.Roles).WithMany(x => x.Users)
                                        .UsingEntity(j => j.ToTable("UserRole"));
    }
}
