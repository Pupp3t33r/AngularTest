using AngularTest.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AngularTest.Data;

public class UserDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }

    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasMany(x => x.Roles).WithMany(x => x.Users)
                     .UsingEntity<UserRole>(
            j => j.HasOne(x => x.Role)
                            .WithMany(x => x.UserRoles)
                            .HasForeignKey(x => x.RolesId),
                    j => j.HasOne(x => x.User)
                            .WithMany(x => x.UserRoles)
                            .HasForeignKey(x => x.UsersId),
            j => j.ToTable("UserRole"));
    }
}
