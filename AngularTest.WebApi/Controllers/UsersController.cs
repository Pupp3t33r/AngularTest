using AngularTest.Services;
using AngularTest.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularTest.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : Controller
{
    private readonly IUserService userService;

    public UsersController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> Add(UserDto user)
    {
        try
        {
            var newId = await userService.CreateUser(user);
            var newUser = await userService.GetUserById(newId);
            return Ok(newUser);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetAll()
    {
        try
        {
            return Ok((await userService.GetAllUsers()).ToList());
        }
        catch (Exception)
        {

            throw;
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> Get(int id)
    {
        try
        {
            var user = await userService.GetUserById(id);
            if (user is null) return NotFound();
            return Ok(user);
        }
        catch (Exception)
        {

            throw;
        }
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(UserDto user)
    {
        try
        {
            var result = await userService.UpdateUser(user);
            if (result < 1) return BadRequest();
            return Ok();
        }
        catch (Exception)
        {

            throw;
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(int id)
    {
        try
        {
            var result = await userService.DeleteUser(id);
            if(result<1) return BadRequest();
            return Ok(id);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
