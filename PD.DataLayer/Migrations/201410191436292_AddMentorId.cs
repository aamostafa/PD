namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMentorId : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.UserProfile", "MentorId");
            RenameColumn(table: "dbo.UserProfile", name: "Mentor_UserId", newName: "MentorId");
            RenameIndex(table: "dbo.UserProfile", name: "IX_Mentor_UserId", newName: "IX_MentorId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.UserProfile", name: "IX_MentorId", newName: "IX_Mentor_UserId");
            RenameColumn(table: "dbo.UserProfile", name: "MentorId", newName: "Mentor_UserId");
            AddColumn("dbo.UserProfile", "MentorId", c => c.Int());
        }
    }
}
