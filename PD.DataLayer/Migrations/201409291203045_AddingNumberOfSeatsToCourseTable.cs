namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingNumberOfSeatsToCourseTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Course", "NumberOfSeats", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Course", "NumberOfSeats");
        }
    }
}
