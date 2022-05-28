using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularTest.WebApi.Migrations
{
    public partial class prefill : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            int roleId = 1;
            var roleColumns = new[] { "Id", "RoleName" };

            migrationBuilder.InsertData
                (
                    table: "Roles",
                    columns: roleColumns,
                    values: new object[] { roleId++, "admin" }
                );
            migrationBuilder.InsertData
                (
                    table: "Roles",
                    columns: roleColumns,
                    values: new object[] { roleId++, "powerUser" }
                );
            migrationBuilder.InsertData
                (
                    table: "Roles",
                    columns: roleColumns,
                    values: new object[] { roleId++, "user" }
                );
            migrationBuilder.InsertData
                (
                    table: "Roles",
                    columns: roleColumns,
                    values: new object[] { roleId++, "guest" }
                );

            int userId = 1;
            var userColumns = new[] { "Id", "Name", "Email" };

            migrationBuilder.InsertData
                (
                    table: "Users",
                    columns: userColumns,
                    values: new object[] { userId++, "admin", "admin@mail.mail" }
                );
            migrationBuilder.InsertData
                (
                    table: "Users",
                    columns: userColumns,
                    values: new object[] { userId++, "user", "user@mail.mail" }
                );
            migrationBuilder.InsertData
                (
                    table: "Users",
                    columns: userColumns,
                    values: new object[] { userId++, "otherUser", "otherUser@mail.mail" }
                );
            migrationBuilder.InsertData
                (
                    table: "Users",
                    columns: userColumns,
                    values: new object[] { userId++, "andAnotherUser", "anotherUser@mail.mail" }
                );
            migrationBuilder.InsertData
                (
                    table: "UserRole",
                    columns: new[] { "RolesId", "UsersId" },
                    values: new object[] { 1, 1 }
                );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
