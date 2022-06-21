using AngularTest.Services.Models;

namespace AngularTest.Services;
public interface IUserService
{
    Task<int> CreateUser(UserDto user);
    Task<IEnumerable<UserDto>> GetAllUsers();
    Task<UserDto?> GetUserById(int id);
    Task<int> UpdateUser(UserDto user);
    Task<int> DeleteUser(int id);
    //Task<int> UpdateRolesOnUser(IEnumerable<int> roles, int UserId);
}
