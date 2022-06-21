namespace AngularTest.Data.Entities;
public class UserRole
{
    public int UsersId { get; set; }
    public int RolesId { get; set; }

    public User User { get; set; }
    public Role Role { get; set; }
}
