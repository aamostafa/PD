namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ImanChange : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Course", "StartDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Course", "EndDate", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Course", "EndDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AlterColumn("dbo.Course", "StartDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
    }
}
