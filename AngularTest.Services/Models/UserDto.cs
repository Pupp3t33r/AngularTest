namespace AngularTest.Services.Models;

public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public IEnumerable<int> RoleIds { get; set; }
}
