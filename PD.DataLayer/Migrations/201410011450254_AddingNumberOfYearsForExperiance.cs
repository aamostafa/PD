namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingNumberOfYearsForExperiance : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Experiences", "YearsOfExperience", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Experiences", "YearsOfExperience");
        }
    }
}
