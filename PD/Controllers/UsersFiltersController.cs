using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PD.Contracts.Interfaces;
using PD.Contracts.Entities;

namespace PD.Controllers
{
    public class UsersFiltersController : ApiController
    {
        private IUsersFiltersService UsersFiltersService;
        public UsersFiltersController(IUsersFiltersService IUsersFilters)
        {
            UsersFiltersService = IUsersFilters;
        }
        // GET api/<controller>
        public UserFilters Get()
        {
            return UsersFiltersService.GetFilters();
         
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}