using AngularTest.Data;
using AngularTest.Data.Entities;
using AngularTest.Services.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace AngularTest.Services;

public class RoleService : IRoleService
{
    private readonly UserDbContext dbContext;
    private readonly IMapper mapper;

    public RoleService(UserDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }

    public async Task<int> AddRole(RoleDto role)
    {
        dbContext.Roles.Add(mapper.Map<Role>(role));
        return await dbContext.SaveChangesAsync();
    }

    public async Task<int> DeleteRole(int roleId)
    {
        var roleToDelete = await dbContext.Roles.FirstOrDefaultAsync(x => x.Id == roleId);
        if (roleToDelete is null) return -1;
        dbContext.Roles.Remove(roleToDelete);
        return await dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<RoleDto>> GetAllRoles()
    {
        return await dbContext.Roles.ProjectTo<RoleDto>(mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<RoleDto> GetRoleById(int id)
    {
        var result = await dbContext.Roles.FirstOrDefaultAsync(r => r.Id == id);
        if (result == null) return null!;
        return mapper.Map<RoleDto>(result);
    }

    public async Task<int> UpdateRole(RoleDto role)
    {
        var entity = dbContext.Roles.Attach(mapper.Map<Role>(role));
        entity.State = EntityState.Modified;
        return await dbContext.SaveChangesAsync();
    }
}
