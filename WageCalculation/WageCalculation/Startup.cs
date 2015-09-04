using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WageCalculation.Startup))]
namespace WageCalculation
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
