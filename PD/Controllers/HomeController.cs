using PD.DataLayer;
using PD.DataLayer;
using PD.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebMatrix.WebData;

namespace PD.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult Index()
        { 
            var db = new ProfessionalDevelopmentEntities();

            var profile = db.UserProfiles.SingleOrDefault(u => u.UserId == WebSecurity.CurrentUserId);
            var membership = db.webpages_Membership.SingleOrDefault(u=>u.UserId == WebSecurity.CurrentUserId);
            if (profile.Gender == null || profile.UserName == null || profile.Title==null || membership.CreateDate==null)
            {
                return RedirectToAction("UserProfile");
            }
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult CourseCataloge()
        {
            return View();
        }

        [Authorize]
        public ActionResult UserProfile()
        {
            return View();
        }

        public ActionResult FileUpload()
        {
            foreach (string file in Request.Files)
            {
                var hpf = this.Request.Files[file];
                if (hpf.ContentLength == 0)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.NoContent);
                }

                string savedFileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Uploads");
                savedFileName = Path.Combine(savedFileName, Path.GetFileName(hpf.FileName));
                hpf.SaveAs(savedFileName);
                return new HttpStatusCodeResult(HttpStatusCode.OK);
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}