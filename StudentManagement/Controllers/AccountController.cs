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
        private readonly SignInManager<IdentityUser> signInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        [HttpGet]
        [Route("~/Account/GetUsers")]
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
        [Route("~/Account/Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            //set isPersistent to true and lockoutfailure to false
            var loggedInUser = await signInManager.PasswordSignInAsync(loginModel.UserName, loginModel.Password, true, false);
            if (loggedInUser.Succeeded)
            {
                return StatusCode(200);
            }
            else
            {
                return BadRequest();
            }
        }
        [Route("~/Account/Delete/{id?}")]
        [HttpDelete]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            var findUser = await userManager.FindByIdAsync(id);
            if (findUser != null)
            {
                var deleteUser = await userManager.DeleteAsync(findUser);
                if (deleteUser.Succeeded)
                {
                    return StatusCode(200);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
