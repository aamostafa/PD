namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMentorIdToUserProfile : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.UserProfile", "MentorId", c => c.Int());
            AddColumn("dbo.UserProfile", "Mentor_UserId", c => c.Int());
            CreateIndex("dbo.UserProfile", "Mentor_UserId");
            AddForeignKey("dbo.UserProfile", "Mentor_UserId", "dbo.UserProfile", "UserId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserProfile", "Mentor_UserId", "dbo.UserProfile");
            DropIndex("dbo.UserProfile", new[] { "Mentor_UserId" });
            DropColumn("dbo.UserProfile", "Mentor_UserId");
            DropColumn("dbo.UserProfile", "MentorId");
        }
    }
}
