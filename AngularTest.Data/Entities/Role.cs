namespace AngularTest.Data.Entities;

public class Role
{
    public int Id { get; set; }
    public string RoleName { get; set; }

    public List<User> Users { get; set; }
    public List<UserRole> UserRoles { get; set; }
}
