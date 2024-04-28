﻿using BookRating.DataAccess;
using BookRating.DTOs;
using BookRating.Models;
using BookRating.Services;
using BookRating.Services.Interfaces;
using BookTating.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookRating.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] UserRegistration newUser)
        {
            try
            {
                var (token, role) = await _authService.RegisterUser(newUser, "User");
                return Ok(new { token, role , isValid = true, user = newUser.Username });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, isValid = false });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn([FromBody] UserLogIn user)
        {
            try
            {
                var (token, role) = await _authService.LoginUser(user);
                return Ok(new { token, role, isValid = true, user = user.Username });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, isValid = false });
            }
        }
    }

}