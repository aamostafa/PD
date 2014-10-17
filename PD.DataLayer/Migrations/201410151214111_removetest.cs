namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removetest : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Category", "test");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Category", "test", c => c.Int(nullable: false));
        }
    }
}
