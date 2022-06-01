using AngularTest.Data;
using AngularTest.Data.Entities;
using AngularTest.Services.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace AngularTest.Services;

public class UserService : IUserService
{
    private readonly UserDbContext dbContext;
    private readonly IMapper mapper;

    public UserService(UserDbContext dbContext, IMapper mapper)
    {
        this.dbContext = dbContext;
        this.mapper = mapper;
    }

    public async Task<int> CreateUser(UserDto user)
    {
        var userToAdd = mapper.Map<User>(user);
        dbContext.Add(userToAdd);
        await dbContext.SaveChangesAsync();
        return userToAdd.Id;
    }

    public async Task<int> DeleteUser(int id)
    {
        var userToDelete = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
        if (userToDelete is null) return -1;
        dbContext.Remove(userToDelete);
        return await dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<UserDto>> GetAllUsers()
    {
        return await dbContext.Users.ProjectTo<UserDto>(mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<UserDto?> GetUserById(int id)
    {
        return await dbContext.Users.ProjectTo<UserDto>(mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(x => x.Id==id);
    }

    public async Task<int> UpdateUser(UserDto user)
    {
        var entity = dbContext.Users.Attach(mapper.Map<User>(user));
        entity.State = EntityState.Modified;
        return await dbContext.SaveChangesAsync();
    }

    public async Task<int> UpdateRolesOnUser(IEnumerable<int> roles, int UserId)
    {
        var user = await dbContext.Users.Include(x=>x.Roles)
                                        .FirstOrDefaultAsync(x=>x.Id==UserId);
        if (user == null) return -1;
        user.Roles.Clear();
        var roles_db = await dbContext.Roles.ToListAsync();
        foreach (var role in roles)
        {
            var roleToAdd = roles_db.FirstOrDefault(x => x.Id == role);
            if (roleToAdd is null) return -1;
            user.Roles.Add(roleToAdd);
        }
        return await dbContext.SaveChangesAsync();
    } 
}
