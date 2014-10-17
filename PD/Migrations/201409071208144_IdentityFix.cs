namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IdentityFix : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Experiences");
            AlterColumn("dbo.Experiences", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Experiences", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.Experiences");
            AlterColumn("dbo.Experiences", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Experiences", "Id");
        }
    }
}
