namespace PD.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CategorySubCategory_MaxLength : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Category", "Name", c => c.String(nullable: false, maxLength: 80));
            AlterColumn("dbo.CategorySection", "Name", c => c.String(nullable: false, maxLength: 80));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.CategorySection", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Category", "Name", c => c.String(nullable: false));
        }
    }
}
