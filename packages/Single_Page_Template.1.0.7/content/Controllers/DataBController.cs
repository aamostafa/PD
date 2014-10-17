using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Breeze.WebApi;
using Breeze.WebApi.EF;
using Newtonsoft.Json.Linq;
using SocialPublisher.Models;

namespace SocialPublisher.Controllers
{
    [BreezeController]
    public class DataBController : Controller
    {
        private readonly EFContextProvider<SocialPublisherEntities> _context =
            new EFContextProvider<SocialPublisherEntities>();

        [HttpGet]
        public string Metadata()
        {
            return _context.Metadata();
        }

        //feed
        [HttpGet]
        public IQueryable<Feed> Feeds()
        {
            return _context.Context.Feeds;
        }


        [HttpGet]
        public IQueryable<Account> Accounts()
        {
            return _context.Context.Accounts;
        }


        [HttpGet]
        public IQueryable<Category> Categories()
        {
            return _context.Context.Categories;
        }

        //[HttpGet]
        //public IQueryable<RssItem> RssItems()
        //{
        //    return _context.Context.RssItems;
        //}

        //[HttpGet]
        //public IQueryable<RssLink> RssLinks()
        //{
        //    return _context.Context.RssLinks;
        //}


        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            ////Thread.Sleep(3000);
            return _context.SaveChanges(saveBundle);
        }

    }
}