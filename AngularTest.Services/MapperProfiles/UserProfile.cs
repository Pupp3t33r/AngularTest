using AngularTest.Data.Entities;
using AngularTest.Services.Models;
using AutoMapper;

namespace AngularTest.Services.MapperProfiles;

public class UserProfile: Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>().ForMember(x=>x.RoleIds, 
            opt=>opt.MapFrom(x=>x.UserRoles.Select(y=>y.RolesId)));

        CreateMap<UserDto, User>().ForMember(x => x.UserRoles,
            opt => opt.MapFrom(
          (dto, ent) => dto.RoleIds
                                .Select(id => new UserRole { UsersId = dto.Id, RolesId = id })));

        CreateMap<Role, RoleDto>().ReverseMap();
    }
}
