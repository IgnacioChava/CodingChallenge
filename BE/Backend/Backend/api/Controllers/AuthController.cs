using Backend.repository.Model;
using Backend.repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.api.Controllers.DTO;
using Microsoft.AspNetCore.Authorization;

namespace Backend.api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly string secretKey;
        private readonly MongoDBService _mongoDBService;

        public AuthController(IConfiguration config, MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
            secretKey = config.GetSection("jwtSettings").GetSection("secretKey").ToString();
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp([FromBody] LoginDTO payload)
        {
            try
            {

                string username = payload.Username;

                string password = payload.Password;

                string role = "User";

                string finalHash = BCrypt.Net.BCrypt.HashPassword(password);

                if (string.IsNullOrEmpty(finalHash))
                {
                    return BadRequest("Password can not be empty");
                    
                }

                Login user = new Login();
                user.Username = username;
                user.Password = finalHash;
                user.Role = role;

                var result1 = _mongoDBService.CreateUser(user);
                
                int code = 200;
                string message = "User created successfully";
                return StatusCode(code, message);

            }
            catch (Exception ex)
            {
                int code = 400;
                string message = "A problem has occured";
                return StatusCode(code, message);
            }

        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO user)
        {
            string username = user.Username;

            string password = user.Password;

            Login result = await _mongoDBService.getUserAsync(username);

            string role = result.Role;

            string finalHash = BCrypt.Net.BCrypt.HashPassword(password);

            if (string.IsNullOrEmpty(finalHash))
            {
                return BadRequest();
            }

            if(result == null)
            {
                return BadRequest();
            }


            if (BCrypt.Net.BCrypt.Verify(password, result.Password))
            {

                //envio el token para acceder a funciones
                var keyBytes = Encoding.ASCII.GetBytes(secretKey);

                var claims = new ClaimsIdentity();

                List<Claim> claimsUser = new List<Claim>();
                claimsUser.Add(new Claim(ClaimTypes.NameIdentifier, username));
                claimsUser.Add(new Claim(ClaimTypes.Role, role));

                foreach (var claim in claimsUser)
                {
                    claims.AddClaim(claim);
                }


                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddHours(6),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();

                var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

                string tokencreado = tokenHandler.WriteToken(tokenConfig);


                return StatusCode(StatusCodes.Status200OK, new { token = tokencreado });

            }
            else
            {
                return Unauthorized();
            }

        }
    }
}
