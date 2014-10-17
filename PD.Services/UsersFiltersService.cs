using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PD.Contracts.Interfaces;
using PD.DataLayer;
using PD.Contracts.Entities;

namespace PD.Services
{
    public class UsersFiltersService : IUsersFiltersService
    {


        public UserFilters GetFilters()
        {
            ProfessionalDevelopmentEntities _context = new ProfessionalDevelopmentEntities();
            var Titles = _context.Titles.ToList();
            UserFilters Filters = new UserFilters();
            Filters.Titles = Titles;
            return Filters;
        }
    }
}
