using AngularTest.Data;
using AngularTest.Services;
using AngularTest.Services.MapperProfiles;
using AutoMapper;
using AutoMapper.EquivalencyExpression;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var AngularFront = "_angularFront";


// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AngularFront,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});

builder.Services.AddDbContext<UserDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SqlSrvr"),
        x => x.MigrationsAssembly("AngularTest.WebApi"));
});

builder.Services.AddAutoMapper((serviceProvider, automapper) =>
{
    automapper.AddCollectionMappers();
    automapper.UseEntityFrameworkCoreModel<UserDbContext>(serviceProvider);
}, typeof(UserProfile).Assembly);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IRoleService, RoleService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(AngularFront);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
