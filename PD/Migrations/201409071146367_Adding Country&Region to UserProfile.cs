namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingCountryRegiontoUserProfile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfile", "Country", c => c.String(maxLength: 500));
            AddColumn("dbo.UserProfile", "Region", c => c.String(maxLength: 500));
            DropColumn("dbo.UserProfile", "Address");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserProfile", "Address", c => c.String(maxLength: 500));
            DropColumn("dbo.UserProfile", "Region");
            DropColumn("dbo.UserProfile", "Country");
        }
    }
}
