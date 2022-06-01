using AngularTest.Services;
using AngularTest.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularTest.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RolesController: Controller
{
    private readonly IRoleService roleService;

    public RolesController(IRoleService roleService)
    {
        this.roleService = roleService;
    }

    [HttpGet]
    public async Task<ActionResult<List<RoleDto>>> GetAll()
    {
        try
        {
            return Ok(await roleService.GetAllRoles());
        }
        catch (Exception)
        {
            throw;
        }
    }
}
