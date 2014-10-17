namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FixingForignKeys : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Region", "Country_Id", "dbo.Country");
            DropIndex("dbo.Region", new[] { "Country_Id" });
            RenameColumn(table: "dbo.UserProfile", name: "Country_Id", newName: "CountryId");
            RenameColumn(table: "dbo.UserProfile", name: "Region_Id", newName: "RegionId");
            RenameColumn(table: "dbo.UserProfile", name: "Title_Id", newName: "TitleId");
            RenameColumn(table: "dbo.Region", name: "Country_Id", newName: "CountryId");
            RenameIndex(table: "dbo.UserProfile", name: "IX_Title_Id", newName: "IX_TitleId");
            RenameIndex(table: "dbo.UserProfile", name: "IX_Country_Id", newName: "IX_CountryId");
            RenameIndex(table: "dbo.UserProfile", name: "IX_Region_Id", newName: "IX_RegionId");
            AlterColumn("dbo.Region", "CountryId", c => c.Int(nullable: false));
            CreateIndex("dbo.Region", "CountryId");
            AddForeignKey("dbo.Region", "CountryId", "dbo.Country", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Region", "CountryId", "dbo.Country");
            DropIndex("dbo.Region", new[] { "CountryId" });
            AlterColumn("dbo.Region", "CountryId", c => c.Int());
            RenameIndex(table: "dbo.UserProfile", name: "IX_RegionId", newName: "IX_Region_Id");
            RenameIndex(table: "dbo.UserProfile", name: "IX_CountryId", newName: "IX_Country_Id");
            RenameIndex(table: "dbo.UserProfile", name: "IX_TitleId", newName: "IX_Title_Id");
            RenameColumn(table: "dbo.Region", name: "CountryId", newName: "Country_Id");
            RenameColumn(table: "dbo.UserProfile", name: "TitleId", newName: "Title_Id");
            RenameColumn(table: "dbo.UserProfile", name: "RegionId", newName: "Region_Id");
            RenameColumn(table: "dbo.UserProfile", name: "CountryId", newName: "Country_Id");
            CreateIndex("dbo.Region", "Country_Id");
            AddForeignKey("dbo.Region", "Country_Id", "dbo.Country", "Id");
        }
    }
}
