using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using LegoHub.Data.Config;
using LegoHub.Data.Constants;
using LegoHub.Data.Helper;
using Google.Apis.Oauth2.v2;

namespace LegoHub.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private AppConfig _config;
        private readonly IVerifyToken _verifyToken;
        public AccountController(IVerifyToken verifyToken, IOptions<AppConfig> config)
        {
            _verifyToken = verifyToken;
            _config = config.Value;
        }

        [Route("login")]
        public async Task<IActionResult> Login(string idToken, string accessToken)
        {
            var result = await _verifyToken.Verify(idToken, accessToken);
            if (result.IdTokenStatus.Valid && result.AccessTokenStatus.Valid && result.TokenInfo != null)
            {
                var claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.NameIdentifier, result.TokenInfo.UserId, ClaimValueTypes.String));
                claims.Add(new Claim(ClaimTypes.Email, result.TokenInfo.Email, ClaimValueTypes.String));

                if (result.TokenInfo.Email.Equals(_config.Admin))
                {
                    claims.Add(new Claim(ClaimTypes.Role, "Administrator", ClaimValueTypes.String));
                    result.IsAdministrator = true;
                }

                var userIdentity = new ClaimsIdentity("GoogleOAuth2");
                userIdentity.AddClaims(claims);
                var userPrincipal = new ClaimsPrincipal(userIdentity);

                await HttpContext.Authentication.SignInAsync(MiddlewareInstance.AuthenticationScheme, userPrincipal,
                    new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.UtcNow.AddMinutes(120),
                        IsPersistent = false,
                        AllowRefresh = false
                    });

            }
            return new ObjectResult(result);
        }

        public IActionResult Forbidden()
        {
            return View();
        }

        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync(MiddlewareInstance.AuthenticationScheme);
            return new ObjectResult(new { success = true, message = "Logout success" });
        }
    }
}
