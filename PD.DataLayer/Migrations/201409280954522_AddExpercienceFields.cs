namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddExpercienceFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Experiences", "JobDescription", c => c.String());
            AddColumn("dbo.Experiences", "ImageUrl", c => c.String());
            AddColumn("dbo.Experiences", "Location", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Experiences", "Location");
            DropColumn("dbo.Experiences", "ImageUrl");
            DropColumn("dbo.Experiences", "JobDescription");
        }
    }
}
