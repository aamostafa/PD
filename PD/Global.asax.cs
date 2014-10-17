using Ninject;
using Ninject.Web.Common;
using PD.App_Start;
using PD.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using WebMatrix.WebData;

namespace PD
{
    public class MvcApplication : NinjectHttpApplication
    {
        protected override void OnApplicationStarted()
        {
         
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);


            WebSecurity.InitializeDatabaseConnection("DefaultConnection",
                                         "UserProfile", "UserId", "UserName",
                                         autoCreateTables: false);

            if (!Roles.RoleExists("Administrator"))
                Roles.CreateRole("Administrator");

            if (!Roles.RoleExists("User"))
                Roles.CreateRole("User");

            if (!Roles.RoleExists("Mentor"))
                Roles.CreateRole("Mentor");

            //if (!Roles.RoleExists("User"))
            //    Roles.CreateRole("User");


        }

        protected override Ninject.IKernel CreateKernel()
        {
            var kernel = new StandardKernel();

            kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();

            IOC.RegisterServices(kernel);
            return kernel;

        }
    }
}
