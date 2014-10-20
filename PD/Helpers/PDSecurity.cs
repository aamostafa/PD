using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebMatrix.WebData;

namespace PD.Helpers
{
    public static class PDSecurity
    {
        public static int CurrentUserID
        {
            get
            {
                return   WebSecurity.CurrentUserId;
            }
        }
    }
}