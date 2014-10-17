namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateCountryTable_RegionTable_AddColumnRegionAndCountryInUserProfile : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Country",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 300),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Region",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 300),
                        Country_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Country", t => t.Country_Id)
                .Index(t => t.Country_Id);
            
            AddColumn("dbo.UserProfile", "Country_Id", c => c.Int());
            AddColumn("dbo.UserProfile", "Region_Id", c => c.Int());
            CreateIndex("dbo.UserProfile", "Country_Id");
            CreateIndex("dbo.UserProfile", "Region_Id");
            AddForeignKey("dbo.UserProfile", "Country_Id", "dbo.Country", "Id");
            AddForeignKey("dbo.UserProfile", "Region_Id", "dbo.Region", "Id");
            DropColumn("dbo.UserProfile", "Country");
            DropColumn("dbo.UserProfile", "Region");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserProfile", "Region", c => c.String(maxLength: 500));
            AddColumn("dbo.UserProfile", "Country", c => c.String(maxLength: 500));
            DropForeignKey("dbo.UserProfile", "Region_Id", "dbo.Region");
            DropForeignKey("dbo.Region", "Country_Id", "dbo.Country");
            DropForeignKey("dbo.UserProfile", "Country_Id", "dbo.Country");
            DropIndex("dbo.Region", new[] { "Country_Id" });
            DropIndex("dbo.UserProfile", new[] { "Region_Id" });
            DropIndex("dbo.UserProfile", new[] { "Country_Id" });
            DropColumn("dbo.UserProfile", "Region_Id");
            DropColumn("dbo.UserProfile", "Country_Id");
            DropTable("dbo.Region");
            DropTable("dbo.Country");
        }
    }
}
