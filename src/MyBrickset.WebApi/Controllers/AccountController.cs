using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Mvc;
using MyBrickset.Data.Helper;

namespace MyBrickset.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {

        private readonly IVerifyToken _verifyToken;
        
        public AccountController(IVerifyToken verifyToken)
        {
            _verifyToken = verifyToken;
        }

        [Route("login")]
        public async Task<IActionResult> Login(string idToken, string accessToken)
        {
           var result= _verifyToken.Verify(idToken,accessToken);
           return new ObjectResult(result);
        }

        public IActionResult Forbidden()
        {
            return View();
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }
    }
}
