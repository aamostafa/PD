namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddStartDateEndDateToSession : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Session", "StartDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
            AddColumn("dbo.Session", "EndDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Session", "EndDate");
            DropColumn("dbo.Session", "StartDate");
        }
    }
}
