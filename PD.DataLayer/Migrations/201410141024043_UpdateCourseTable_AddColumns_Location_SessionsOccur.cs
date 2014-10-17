namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateCourseTable_AddColumns_Location_SessionsOccur : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Course", "Location", c => c.String(maxLength: 255));
            AddColumn("dbo.Course", "SessionsOccur", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Course", "SessionsOccur");
            DropColumn("dbo.Course", "Location");
        }
    }
}
