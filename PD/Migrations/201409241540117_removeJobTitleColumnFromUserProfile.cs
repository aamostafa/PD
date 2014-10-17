namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removeJobTitleColumnFromUserProfile : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.UserProfile", "JobTitle");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserProfile", "JobTitle", c => c.String(maxLength: 500));
        }
    }
}
