namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Creation : DbMigration
    {
        public override void Up()
        {
            //CreateTable(
            //    "dbo.Category",
            //    c => new
            //        {
            //            Id = c.Int(nullable: false, identity: true),
            //            Name = c.String(nullable: false),
            //            SectionId = c.Int(nullable: false),
            //        })
            //    .PrimaryKey(t => t.Id)
            //    .ForeignKey("dbo.CategorySection", t => t.SectionId)
            //    .Index(t => t.SectionId);
            
            CreateTable(
                "dbo.CategorySection",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Course",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 255),
                        ImageUrl = c.String(),
                        StartDate = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        EndDate = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        Instructor = c.String(maxLength: 255),
                        Description = c.String(),
                        CategoryId = c.Int(nullable: false),
                        PublishingDate = c.DateTime(precision: 7, storeType: "datetime2"),
                        Details = c.String(),
                        TargetAudience = c.String(),
                        Participants = c.String(),
                        RequiredBackground = c.String(),
                        Competencies = c.String(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Category", t => t.CategoryId)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.FAQ",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Question = c.String(nullable: false),
                        Answer = c.String(nullable: false),
                        CourseId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Course", t => t.CourseId)
                .Index(t => t.CourseId);
            
            CreateTable(
                "dbo.Session",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        PublishedDate = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        Objectives = c.String(),
                        CourseId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Course", t => t.CourseId)
                .Index(t => t.CourseId);
            
            CreateTable(
                "dbo.Material",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Url = c.String(nullable: false),
                        SessionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Session", t => t.SessionId)
                .Index(t => t.SessionId);
            
            CreateTable(
                "dbo.SessionState",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        userID = c.Int(nullable: false),
                        Sessions = c.String(),
                        CourseId = c.Int(nullable: false),
                        UserCourseId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserCourse", t => t.UserCourseId)
                .ForeignKey("dbo.UserProfile", t => t.userID)
                .ForeignKey("dbo.Course", t => t.CourseId)
                .Index(t => t.userID)
                .Index(t => t.CourseId)
                .Index(t => t.UserCourseId);
            
            CreateTable(
                "dbo.UserCourse",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        CourseId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserProfile", t => t.UserId)
                .ForeignKey("dbo.Course", t => t.CourseId)
                .Index(t => t.UserId)
                .Index(t => t.CourseId);
            
            CreateTable(
                "dbo.UserProfile",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        UserName = c.String(nullable: false, maxLength: 500),
                        Email = c.String(nullable: false, maxLength: 500),
                        JobTitle = c.String(maxLength: 500),
                        Address = c.String(maxLength: 500),
                        ImageUrl = c.String(maxLength: 500),
                        About = c.String(),
                        Experience = c.String(),
                        Interests = c.String(),
                        LinkedInUrl = c.String(),
                        GoogleUrl = c.String(),
                        FacebookUrl = c.String(),
                        TwitterUrl = c.String(),
                        BirthDay = c.DateTime(storeType: "date"),
                        Gender = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.webpages_Roles",
                c => new
                    {
                        RoleId = c.Int(nullable: false, identity: true),
                        RoleName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.RoleId);
            
            CreateTable(
                "dbo.Competencies",
                c => new
                    {
                        Id = c.Int(nullable: false),
                        Name = c.String(nullable: false),
                        ParentId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Competencies", t => t.ParentId)
                .Index(t => t.ParentId);
            
            CreateTable(
                "dbo.webpages_Membership",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        CreateDate = c.DateTime(),
                        ConfirmationToken = c.String(maxLength: 128),
                        IsConfirmed = c.Boolean(),
                        LastPasswordFailureDate = c.DateTime(),
                        PasswordFailuresSinceLastSuccess = c.Int(nullable: false),
                        Password = c.String(nullable: false, maxLength: 128),
                        PasswordChangedDate = c.DateTime(),
                        PasswordSalt = c.String(nullable: false, maxLength: 128),
                        PasswordVerificationToken = c.String(maxLength: 128),
                        PasswordVerificationTokenExpirationDate = c.DateTime(),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.webpages_OAuthMembership",
                c => new
                    {
                        Provider = c.String(nullable: false, maxLength: 30),
                        ProviderUserId = c.String(nullable: false, maxLength: 100),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Provider, t.ProviderUserId });
            
            CreateTable(
                "dbo.webpages_UsersInRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.UserProfile", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.webpages_Roles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Competencies", "ParentId", "dbo.Competencies");
            DropForeignKey("dbo.Course", "CategoryId", "dbo.Category");
            DropForeignKey("dbo.UserCourse", "CourseId", "dbo.Course");
            DropForeignKey("dbo.SessionState", "CourseId", "dbo.Course");
            DropForeignKey("dbo.webpages_UsersInRoles", "RoleId", "dbo.webpages_Roles");
            DropForeignKey("dbo.webpages_UsersInRoles", "UserId", "dbo.UserProfile");
            DropForeignKey("dbo.UserCourse", "UserId", "dbo.UserProfile");
            DropForeignKey("dbo.SessionState", "userID", "dbo.UserProfile");
            DropForeignKey("dbo.SessionState", "UserCourseId", "dbo.UserCourse");
            DropForeignKey("dbo.Session", "CourseId", "dbo.Course");
            DropForeignKey("dbo.Material", "SessionId", "dbo.Session");
            DropForeignKey("dbo.FAQ", "CourseId", "dbo.Course");
            DropForeignKey("dbo.Category", "SectionId", "dbo.CategorySection");
            DropIndex("dbo.webpages_UsersInRoles", new[] { "RoleId" });
            DropIndex("dbo.webpages_UsersInRoles", new[] { "UserId" });
            DropIndex("dbo.Competencies", new[] { "ParentId" });
            DropIndex("dbo.UserCourse", new[] { "CourseId" });
            DropIndex("dbo.UserCourse", new[] { "UserId" });
            DropIndex("dbo.SessionState", new[] { "UserCourseId" });
            DropIndex("dbo.SessionState", new[] { "CourseId" });
            DropIndex("dbo.SessionState", new[] { "userID" });
            DropIndex("dbo.Material", new[] { "SessionId" });
            DropIndex("dbo.Session", new[] { "CourseId" });
            DropIndex("dbo.FAQ", new[] { "CourseId" });
            DropIndex("dbo.Course", new[] { "CategoryId" });
            DropIndex("dbo.Category", new[] { "SectionId" });
            DropTable("dbo.webpages_UsersInRoles");
            DropTable("dbo.webpages_OAuthMembership");
            DropTable("dbo.webpages_Membership");
            DropTable("dbo.Competencies");
            DropTable("dbo.webpages_Roles");
            DropTable("dbo.UserProfile");
            DropTable("dbo.UserCourse");
            DropTable("dbo.SessionState");
            DropTable("dbo.Material");
            DropTable("dbo.Session");
            DropTable("dbo.FAQ");
            DropTable("dbo.Course");
            DropTable("dbo.CategorySection");
            DropTable("dbo.Category");
        }
    }
}
