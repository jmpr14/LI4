using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ConsultaJa.Models;
using ConsultaJa.Backend;

namespace ConsultaJa.Services
{
    public class AdminService
    {
        public AdminModel Authenticate(AdminModel admin)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Settings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, "admin")
                }),
                Expires = DateTime.UtcNow.AddHours(0.5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            admin.Token = tokenHandler.WriteToken(token);

            admin.Senha = null;

            return admin;
        }
    }
}

