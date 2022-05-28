using AngularTest.Services.Models;

namespace AngularTest.Services;

public interface IRoleService
{
    Task<int> AddRole(RoleDto role);
    Task<IEnumerable<RoleDto>> GetAllRoles();
    Task<RoleDto> GetRoleById(int id);
    Task<int> UpdateRole(RoleDto role);
    Task<int> DeleteRole(int roleId);

}
