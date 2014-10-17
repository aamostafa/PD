namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class cxcx : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.SessionState", "UserCourseId", "dbo.UserCourse");
            DropIndex("dbo.SessionState", new[] { "UserCourseId" });
            AlterColumn("dbo.SessionState", "UserCourseId", c => c.Int());
            CreateIndex("dbo.SessionState", "UserCourseId");
            AddForeignKey("dbo.SessionState", "UserCourseId", "dbo.UserCourse", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SessionState", "UserCourseId", "dbo.UserCourse");
            DropIndex("dbo.SessionState", new[] { "UserCourseId" });
            AlterColumn("dbo.SessionState", "UserCourseId", c => c.Int(nullable: false));
            CreateIndex("dbo.SessionState", "UserCourseId");
            AddForeignKey("dbo.SessionState", "UserCourseId", "dbo.UserCourse", "Id", cascadeDelete: true);
        }
    }
}
