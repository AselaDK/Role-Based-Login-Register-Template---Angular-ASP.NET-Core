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

        // new get method for role Admin
        [HttpGet]
        [Authorize(Roles ="Admin")]
        [Route("ForAdmin")]
        // GET : api/UserProfile/ForAdmin
        public string GetForAdmin()
        {
            return "Web Method for Admin";
        }

        // new get method for role Traveller
        [HttpGet]
        [Authorize(Roles = "Traveller")]
        [Route("ForTraveller")]
        // GET : api/UserProfile/ForTraveller
        public string GetForTraveller()
        {
            return "Web Method for Traveller";
        }

        // new get method for role Guider
        [HttpGet]
        [Authorize(Roles = "Guider")]
        [Route("ForGuider")]
        // GET : api/UserProfile/ForGuider
        public string GetForGuider()
        {
            return "Web Method for Guider";
        }

        // new get method for roles Admin Or Traveller Or Guider
        [HttpGet]
        [Authorize(Roles = "Admin,Traveller,Guider")]
        [Route("ForAdminOrTravellerOrGuider")]
        public string GetForAdminOrTravellerOrGuider()
        {
            return "Web Method for Admin Or Traveller Or Guider";
        }

    }
}