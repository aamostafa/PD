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
    public class UserService : IUserService
    {


        public UserFilters GetFilters()
        {
            using (ProfessionalDevelopmentEntities _context = new ProfessionalDevelopmentEntities())
            {
                var Titles = _context.Titles.ToList();
                UserFilters Filters = new UserFilters();
                Filters.Titles = Titles;
                return Filters;
            }
        }


        public List<UserProfile> GetBy(SearchCriteria SearchCriteria, int Size, int PageIndex)
        {

            var numberOfItemsToSkip=Size * PageIndex;


            using (ProfessionalDevelopmentEntities context = new ProfessionalDevelopmentEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                var userProfilesQuery = context.UserProfiles.AsQueryable();

                if (!string.IsNullOrEmpty(SearchCriteria.Gender))
                    userProfilesQuery = userProfilesQuery.Where(x => x.Gender.ToLower() == SearchCriteria.Gender.ToLower());
                
                if(SearchCriteria.TitlesID != null && SearchCriteria.TitlesID.Count>0)
                    userProfilesQuery = userProfilesQuery.Where(x => SearchCriteria.TitlesID.Any(z=>z== x.TitleId));
                
                if(!string.IsNullOrEmpty(SearchCriteria.UserName))
                   userProfilesQuery=userProfilesQuery.Where( x => x.UserName.ToLower().Contains(SearchCriteria.UserName.ToLower()));
                
                if(SearchCriteria.JoiningPeriod!=null)
                      userProfilesQuery=userProfilesQuery.Where( x => x.JoinedDate.Month + SearchCriteria.JoiningPeriod >= DateTime.Now.Month);


               return userProfilesQuery.OrderBy(x=>x.UserId). Skip(numberOfItemsToSkip).Take(Size).ToList<UserProfile>();
            }
            
        }

       
    }
}
