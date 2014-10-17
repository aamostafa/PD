namespace PD.Migrations
{
   using PD.Contracts.Entities;
   
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PD.DataLayer.ProfessionalDevelopmentEntities>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(PD.DataLayer.ProfessionalDevelopmentEntities context)
        {
            List<Region> r=new List<Region>{new Region{Name="Region1"},new Region{Name="Region1"}
            };
                context.Countries.AddOrUpdate(
                  p => p.Name,
                  new Country { Name = "XXXX",regions=r}
             
                );
                context.SaveChanges();
          
               
            

        }
    }
}
