namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTitleTable_AddTitleColoumnInUserProfile : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Title",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 80),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.UserProfile", "Title_Id", c => c.Int());
            AlterColumn("dbo.Course", "StartDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Course", "EndDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            CreateIndex("dbo.UserProfile", "Title_Id");
            AddForeignKey("dbo.UserProfile", "Title_Id", "dbo.Title", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserProfile", "Title_Id", "dbo.Title");
            DropIndex("dbo.UserProfile", new[] { "Title_Id" });
            AlterColumn("dbo.Course", "EndDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Course", "StartDate", c => c.DateTime(nullable: false));
            DropColumn("dbo.UserProfile", "Title_Id");
            DropTable("dbo.Title");
        }
    }
}
