using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PD.Contracts.Entities;
using PD.DataLayer;
using WebMatrix.WebData;

namespace PD.Controllers
{
    [Authorize(Roles = "Administrator")]
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            var db = new ProfessionalDevelopmentEntities();

            var courses = db.Courses.ToList();


            return View(courses);


            User.IsInRole("");
        }



    }
}