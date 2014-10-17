namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TitlenotNull : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.UserProfile", "TitleId", "dbo.Title");
            DropIndex("dbo.UserProfile", new[] { "TitleId" });
            AlterColumn("dbo.UserProfile", "TitleId", c => c.Int(nullable: false));
            CreateIndex("dbo.UserProfile", "TitleId");
            AddForeignKey("dbo.UserProfile", "TitleId", "dbo.Title", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserProfile", "TitleId", "dbo.Title");
            DropIndex("dbo.UserProfile", new[] { "TitleId" });
            AlterColumn("dbo.UserProfile", "TitleId", c => c.Int());
            CreateIndex("dbo.UserProfile", "TitleId");
            AddForeignKey("dbo.UserProfile", "TitleId", "dbo.Title", "Id");
        }
    }
}
