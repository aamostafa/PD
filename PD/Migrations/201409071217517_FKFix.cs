namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FKFix : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Experiences", name: "UserProfile_UserId", newName: "UserProfileId");
            RenameIndex(table: "dbo.Experiences", name: "IX_UserProfile_UserId", newName: "IX_UserProfileId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Experiences", name: "IX_UserProfileId", newName: "IX_UserProfile_UserId");
            RenameColumn(table: "dbo.Experiences", name: "UserProfileId", newName: "UserProfile_UserId");
        }
    }
}
