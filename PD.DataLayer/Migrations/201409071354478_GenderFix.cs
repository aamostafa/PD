namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class GenderFix : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.UserProfile", "Gender", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UserProfile", "Gender", c => c.Boolean());
        }
    }
}
