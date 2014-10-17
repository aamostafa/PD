namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MakeExperianceEndDateNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Experiences", "EndDate", c => c.DateTime(precision: 7, storeType: "datetime2"));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Experiences", "EndDate", c => c.DateTime(nullable: false, precision: 7, storeType: "datetime2"));
        }
    }
}
