using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PD.Services;
using PD.Contracts.Interfaces;

namespace PD.DependencyInjection
{
   public class IOC
    {
       public static void RegisterServices(IKernel kernel)
       {
           kernel.Bind<IUsersFiltersService>().To<UsersFiltersService>();
       }
    }
}
