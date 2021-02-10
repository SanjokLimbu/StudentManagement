using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StudentManagement.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagement.Controllers
{
    [Route("[Controller]/[Action]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> userManager;

        public AccountController(UserManager<IdentityUser> userManager)
        {
            this.userManager = userManager;
        }
        [HttpGet]
        public JsonResult GetUsers()
        {
            var users = userManager.Users;
            return new JsonResult(users);
        }
        [Route("~/Account/Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            var checkUser = await userManager.FindByEmailAsync(registerModel.Email);
            if(checkUser != null)
            {
                return BadRequest();
            }
            var user = new IdentityUser
            {
                UserName = registerModel.UserName,
                Email = registerModel.Email
            };
            var registeredUser = await userManager.CreateAsync(user, registerModel.Password);
            if (registeredUser.Succeeded)
            {
                return StatusCode(201);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
