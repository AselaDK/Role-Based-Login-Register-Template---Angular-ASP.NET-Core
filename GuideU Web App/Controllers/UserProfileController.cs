using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GuideU_Web_App.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

// for secure routes

namespace GuideU_Web_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        //method to get email, fullname etc..

        [HttpGet]
        [Authorize]
        //GET: /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            // has to get the jwt token to identify whish user is making the request
            string userId = User.Claims.First(c => c.Type == "UserID").Value;   // "UserId" is the property that Claimed in ApplicationUserController
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.FullName,
                user.Email,
                user.UserName
            };
        }

    }
}