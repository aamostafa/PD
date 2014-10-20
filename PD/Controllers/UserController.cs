using Newtonsoft.Json;
using PD.Contracts.Entities;
using PD.Contracts.Interfaces;
using PD.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebMatrix.WebData;
//using PD.


namespace PD.Controllers
{
    public class UserController : ApiController
    {
        
        private IUserService UserService;
        public UserController(IUserService IUsersFilters)
        {
            UserService = IUsersFilters;
        }


        public List<UserProfile> Get(string SearchCriteria, int Size, int PageIndex)
        {

            var searchCriteria = JsonConvert.DeserializeObject<SearchCriteria>(SearchCriteria);
            searchCriteria.IsAdmin= User.IsInRole("Administrator")?true:false;
            searchCriteria.MentorID = PDSecurity.CurrentUserID;
            var  Users=UserService.GetBy(searchCriteria,Size,PageIndex);
            return Users;
        }

      
    }
}