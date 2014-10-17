using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Owin;
using PD.Contracts.Entities;
using WebMatrix.WebData;

namespace PD.Controllers
{
    public class AccountBaseController : Controller
    {
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Login(LoginModel model, string returnUrl)
        {
            if (ModelState.IsValid && WebSecurity.Login(model.UserName, model.Password, persistCookie: model.RememberMe))
            {
                return RedirectToLocal(returnUrl);
            }

            // If we got this far, something failed, redisplay form
            ModelState.AddModelError("", "The user name or password provided is incorrect.");
            return View(model);
        }


        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Attempt to register the user
                    string confirmationToken = WebSecurity.CreateUserAndAccount(model.UserName,
                          model.Password,
                          new { Email = model.Email, TitleId = 1, JoinedDate = DateTime.Now },
                          requireConfirmationToken: RequireEmailConfirmation);

                    Roles.AddUserToRole(model.UserName, Role);

                    //if (RequireEmailConfirmation)
                    //{
                    //    dynamic email =
                    //        new Postal.Email(ConfigurationManager.AppSettings["Register_Template"]);
                    //    email.To = model.Email;
                    //    email.From = ConfigurationManager.AppSettings["Register_From"];
                    //    email.SiteName = ConfigurationManager.AppSettings["Register_SiteName"];
                    //    email.SiteUrl = ConfigurationManager.AppSettings["Register_SiteUrl"];
                    //    email.Token = confirmationToken;
                    //    email.SupportEmail = ConfigurationManager.AppSettings["Register_SupportEmail"];
                    //    email.Send();
                    //    dynamic confirm = new ExpandoObject();
                    //    confirm.Email = model.Email;
                    //    confirm.From = email.From;
                    //    confirm.SiteUrl = email.SiteUrl;
                    //    return View("PendingConfirmation", confirm);
                    //}
                    //else
                    //{
                    //    WebSecurity.Login(model.UserName, model.Password);
                    //}
                    WebSecurity.Login(model.UserName, model.Password);
                    return RedirectToAction("Index", "Home");

                }
                catch (MembershipCreateUserException ex)
                {
                    ModelState.AddModelError("", ex.Message);
                    return View(model);
                }
            }
            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult Confirmation(string token)
        {
            var res = WebSecurity.ConfirmAccount(token);
            return View("MailConfirmation", res);
        }

        [AllowAnonymous]
        public ActionResult ForgetPassword()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult ForgetPassword(string email)
        {

            return View();
        }
        //[AllowAnonymous]
        //public ActionResult PendingConfirmation(dynamic email)
        //{
        //    ViewBag.Email = email.To;
        //    ViewBag.From = email.From;
        //    ViewBag.SiteUrl = email.SiteUrl;
        //    return View();
        //}

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            var userName = HttpContext.User.Identity.Name;
            WebSecurity.Logout();
            return RedirectToAction("Index", "Home");
        }

        public virtual bool RequireEmailConfirmation
        {
            get
            {
                return false;
                    //Convert.ToBoolean(
                    //    ConfigurationManager.AppSettings["Register_RequireEmailConfirmation"]);
            }
        }

        public virtual string Role
        {
            get { return "User"; }
        }

        #region Helpers

        private ActionResult RedirectToLocal(string returnUrl)
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

        public enum ManageMessageId
        {
            ChangePasswordSuccess,
            SetPasswordSuccess,
            RemoveLoginSuccess,
        }

        internal class ExternalLoginResult : ActionResult
        {
            public ExternalLoginResult(string provider, string returnUrl)
            {
                Provider = provider;
                ReturnUrl = returnUrl;
            }

            public string Provider { get; private set; }
            public string ReturnUrl { get; private set; }

            public override void ExecuteResult(ControllerContext context)
            {
                //OAuthWebSecurity.RequestAuthentication(Provider, ReturnUrl);
            }
        }

        private static string ErrorCodeToString(MembershipCreateStatus createStatus)
        {
            // See http://go.microsoft.com/fwlink/?LinkID=177550 for
            // a full list of status codes.
            switch (createStatus)
            {
                case MembershipCreateStatus.DuplicateUserName:
                    return "User name already exists. Please enter a different user name.";

                case MembershipCreateStatus.DuplicateEmail:
                    return "A user name for that e-mail address already exists. Please enter a different e-mail address.";

                case MembershipCreateStatus.InvalidPassword:
                    return "The password provided is invalid. Please enter a valid password value.";

                case MembershipCreateStatus.InvalidEmail:
                    return "The e-mail address provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidAnswer:
                    return "The password retrieval answer provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidQuestion:
                    return "The password retrieval question provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.InvalidUserName:
                    return "The user name provided is invalid. Please check the value and try again.";

                case MembershipCreateStatus.ProviderError:
                    return "The authentication provider returned an error. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                case MembershipCreateStatus.UserRejected:
                    return "The user creation request has been canceled. Please verify your entry and try again. If the problem persists, please contact your system administrator.";

                default:
                    return "An unknown error occurred. Please verify your entry and try again. If the problem persists, please contact your system administrator.";
            }
        }

        #endregion
    }

    [Authorize]
    //[InitializeSimpleMembership]
    public class AccountController : AccountBaseController
    {
        public override string Role
        {
            get { return "User"; }
        }
    }
}