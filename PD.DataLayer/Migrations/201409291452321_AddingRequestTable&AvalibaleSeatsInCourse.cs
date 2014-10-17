namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingRequestTableAvalibaleSeatsInCourse : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Course", "NumberOfReservedSeats", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Course", "NumberOfReservedSeats");
        }
    }
}
