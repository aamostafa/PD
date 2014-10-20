using PD.Contracts.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PD.Contracts.Interfaces
{
    public interface IUserService
    {

        UserFilters GetFilters();
        List<UserProfile> GetBy(SearchCriteria SearchCriteria,int Size,int PageIndex);
    }
}
