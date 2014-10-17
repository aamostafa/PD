namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class JoinedDateColumn_RequiredAndDateTime : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.UserProfile", "JoinedDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UserProfile", "JoinedDate", c => c.String());
        }
    }
}
