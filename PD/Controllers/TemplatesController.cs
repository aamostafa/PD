using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PD.Controllers
{
    //This controller will render the template pages (html) that requires authentication 
    //or that has parts that need to be shown/hidden according to the user's permissions
    public class TemplatesController : Controller
    {
        public ActionResult CourseDetails()
        {
            return View();
        }

        public ActionResult CoursesCatalog()
        {
            return View();
        }
    }
}