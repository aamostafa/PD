namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingExperienceTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Experiences",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrganisationName = c.String(nullable: false),
                        Title = c.String(nullable: false),
                        StartDate = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        EndDate = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        UserProfile_UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserProfile", t => t.UserProfile_UserId, cascadeDelete: true)
                .Index(t => t.UserProfile_UserId);
            
            AddColumn("dbo.UserProfile", "School", c => c.String());
            DropColumn("dbo.UserProfile", "Experience");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserProfile", "Experience", c => c.String());
            DropForeignKey("dbo.Experiences", "UserProfile_UserId", "dbo.UserProfile");
            DropIndex("dbo.Experiences", new[] { "UserProfile_UserId" });
            DropColumn("dbo.UserProfile", "School");
            DropTable("dbo.Experiences");
        }
    }
}
