using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PD.Startup))]
namespace PD
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
