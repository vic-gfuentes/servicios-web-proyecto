using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using servicios_web_proyecto.Context;
using servicios_web_proyecto.DAO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace servicios_web_proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<object> LogIn(LoginDAO request)
        {
            var response = await _context.Users.Where(usr => usr.Email == request.Email && usr.Password == request.Password).FirstOrDefaultAsync();

            if (response == null) return BadRequest("Invalid Credentials");

            return Ok(response);
        }
    }
}
