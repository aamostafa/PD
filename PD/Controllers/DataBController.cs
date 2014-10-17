using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using PD.DataLayer;
using PD.Contracts.Entities;
using System.Linq;
using System.Web.Http;
using System.Threading;
using Breeze.ContextProvider;
using Newtonsoft.Json.Linq;
using WebMatrix.WebData;
using System.Collections.Generic;
using System;
namespace PD.Controllers
{
    [BreezeController]
    [Authorize]
    public class DataBController : ApiController
    {
        private readonly EFContextProvider<ProfessionalDevelopmentEntities> _context =
            new EFContextProvider<ProfessionalDevelopmentEntities>();
        int userId =WebSecurity.CurrentUserId;

        //[HttpPost]
        //[Authorize]
        //public bool Enroll(int courseId)
        //{
        //    var db = new ProfessionalDevelopmentEntities();
        //    var items = db.UserCourses.Single(c => c.CourseId == courseId && c.UserId == userId);
        //    db.UserCourses.Remove(items);
        //    db.SaveChanges();
        //    return true;
        //}


        public DataBController()
        {
            _context.BeforeSaveEntityDelegate = BeforeSaveEntity;
        }

        [HttpGet]
        public string Metadata()
        {
            return _context.Metadata();
        }


        [HttpGet]
        [BreezeQueryable(MaxExpansionDepth = 3)]
        public IQueryable<Course> Courses()
        {
            return _context.Context.Courses;
        }

        [HttpGet]
        public IQueryable<UserCourse> UserCourses()
        {
            return _context.Context.UserCourses.Where(u => u.UserId == userId);
        }

        [HttpGet]
        public IQueryable<Session> Sessions()
        {
            return _context.Context.Sessions;
        }
        [HttpGet]
        public IQueryable<FAQ> FAQs()
        {
            return _context.Context.FAQs;
        }


        [HttpGet]
        public IQueryable<Material> Materials()
        {
            return _context.Context.Materials;
        }


        [HttpGet]
        public IQueryable<CategorySection> CategorySections()
        {
            return _context.Context.CategorySections;
        }

        [HttpGet]
        [Authorize]
        public IQueryable<SessionState> SessionStates()
        {
            return _context.Context.SessionStates.Where(s => s.userID == userId);
        }


        [HttpGet]
        public IQueryable<UserProfile> UserProfiles()
        {
            return _context.Context.UserProfiles.Where(s => s.UserId == userId);
        }
        [HttpGet]
        public IQueryable<Country> Countries()
        {
            return _context.Context.Countries;
        }
        [HttpGet]
        public IQueryable<Region> Regions()
        {
            return _context.Context.Regions;
        }

        [HttpGet]
        public IQueryable<Experience> Experiences()
        {
            return _context.Context.Experiences.Where(s => s.UserProfile.UserId == userId);
        }

        [HttpGet]
        public IQueryable<MaritalStatus> MaritalStatuses()
        {
            return _context.Context.MaritalStatuses;
        }

        [HttpGet]
        public IQueryable<Request> Requests()
        {
            return _context.Context.Requests.Where(s => s.UserProfileId == userId);
        }

        [HttpGet]
        public IQueryable<Title> Titles()
        {
            return _context.Context.Titles;
        }

        //[HttpGet]
        //public 

        //[HttpGet]
        //public IQueryable<Account> Accounts()
        //{
        //    return _context.Context.Accounts;
        //}

        //[HttpGet]
        //public IQueryable<> Categories()
        //{
        //    return _context.Context.Categories;
        //}


        [HttpGet]
        public IQueryable<Category> Categories()
        {
            return _context.Context.Categories;
        }
        [HttpGet]
        public IQueryable<Competency> Competencies()
        {
            return _context.Context.Competencies;
        }
        ////[HttpGet]
        ////public IQueryable<RssItem> RssItems()
        ////{
        ////    return _context.Context.RssItems;
        ////}

        ////[HttpGet]
        ////public IQueryable<RssLink> RssLinks()
        ////{
        ////    return _context.Context.RssLinks;
        ////}


        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {

            return _context.SaveChanges(saveBundle);
        }
        protected bool BeforeSaveEntity(EntityInfo entityInfo)
        {
            if (entityInfo.EntityState == EntityState.Added || entityInfo.EntityState == EntityState.Modified)
            {
                if(entityInfo.Entity.GetType() == typeof(UserCourse))
                {
                    UserCourse c = (UserCourse)entityInfo.Entity;
                    c.UserId = userId;
                }

                if (entityInfo.Entity.GetType() == typeof(SessionState))
                {
                    SessionState c = (SessionState)entityInfo.Entity;
                    c.userID = userId;
                }

                if (entityInfo.Entity.GetType() == typeof(Request))
                {
                    Request c = (Request)entityInfo.Entity;
                    c.UserProfileId = userId;
                }
                
            }
            return true;
        }

        

    }
}