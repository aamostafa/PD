namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class nullGender : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.UserProfile", "Gender", c => c.Boolean());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UserProfile", "Gender", c => c.Boolean(nullable: false));
        }
    }
}
