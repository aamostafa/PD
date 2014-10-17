namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class requestTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Request",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MentorID = c.Int(),
                        Status = c.String(),
                        CourseId = c.Int(nullable: false),
                        UserProfileId = c.Int(nullable: false),
                        UserProfile_UserId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Course", t => t.CourseId, cascadeDelete: true)
                .ForeignKey("dbo.UserProfile", t => t.UserProfile_UserId)
                .Index(t => t.CourseId)
                .Index(t => t.UserProfile_UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Request", "UserProfile_UserId", "dbo.UserProfile");
            DropForeignKey("dbo.Request", "CourseId", "dbo.Course");
            DropIndex("dbo.Request", new[] { "UserProfile_UserId" });
            DropIndex("dbo.Request", new[] { "CourseId" });
            DropTable("dbo.Request");
        }
    }
}
