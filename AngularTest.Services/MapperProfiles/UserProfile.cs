using AngularTest.Data.Entities;
using AngularTest.Services.Models;
using AutoMapper;

namespace AngularTest.Services.MapperProfiles;

public class UserProfile: Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>().ForMember(x=>x.RoleIds, 
            opt=>opt.MapFrom(y=>y.Roles.Select(z=>z.Id)));

        CreateMap<UserDto, User>().ForMember(x => x.Roles,
                opt => opt.Ignore());

        CreateMap<Role, RoleDto>().ReverseMap();
    }
}
