namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMaritalStatusTableAndForeginKeyInUserProfile : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MaritalStatus",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        status = c.String(nullable: false, maxLength: 30),
                    })
                .PrimaryKey(t => t.id);
            
            AddColumn("dbo.UserProfile", "MaritalStatusId", c => c.Int());
            CreateIndex("dbo.UserProfile", "MaritalStatusId");
            AddForeignKey("dbo.UserProfile", "MaritalStatusId", "dbo.MaritalStatus", "id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserProfile", "MaritalStatusId", "dbo.MaritalStatus");
            DropIndex("dbo.UserProfile", new[] { "MaritalStatusId" });
            DropColumn("dbo.UserProfile", "MaritalStatusId");
            DropTable("dbo.MaritalStatus");
        }
    }
}
