namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddColumn_JoinedDate_toUserProfileTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfile", "JoinedDate", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.UserProfile", "JoinedDate");
        }
    }
}
