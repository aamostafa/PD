namespace PD.DataLayer
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddingCourseTypeToCourse : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Course", "IsFacetoFace", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Course", "IsFacetoFace");
        }
    }
}
