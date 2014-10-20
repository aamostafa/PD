using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PD.Contracts.Entities
{
   public class SearchCriteria
    {
       public string UserName { get; set; }
       public List<int> TitlesID { get; set; }
       public string Gender { get; set; }
       public int? JoiningPeriod { get; set; }
       public int MentorID { get; set; }
       public bool IsAdmin { get; set; }
     

    }
}
