using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PD.Contracts.Entities;

namespace PD.DataLayer
{

    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ProfessionalDevelopmentEntities : DbContext
    {
        public ProfessionalDevelopmentEntities()
            : base("name=DefaultConnection")
        {
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CategorySection> CategorySections { get; set; }
        public virtual DbSet<Competency> Competencies { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<FAQ> FAQs { get; set; }
        public virtual DbSet<Material> Materials { get; set; }
        public virtual DbSet<Session> Sessions { get; set; }
        public virtual DbSet<SessionState> SessionStates { get; set; }
        public virtual DbSet<UserCourse> UserCourses { get; set; }
        public virtual DbSet<UserProfile> UserProfiles { get; set; }
        public virtual DbSet<webpages_Membership> webpages_Membership { get; set; }
        public virtual DbSet<webpages_OAuthMembership> webpages_OAuthMembership { get; set; }
        public virtual DbSet<webpages_Roles> webpages_Roles { get; set; }
        public virtual DbSet<Experience> Experiences { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Region> Regions { get; set; }
        public virtual DbSet<Title> Titles { get; set; }
        public virtual DbSet<Request> Requests { get; set; }
        public virtual DbSet<MaritalStatus> MaritalStatuses { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<UserCourse>()
            //    .HasMany(u => u.SessionStates)
            //    .WithRequired(e => e.UserCourse)
            //    .WillCascadeOnDelete(true);

            modelBuilder.Entity<Category>()
                .HasMany(e => e.Courses)
                .WithRequired(e => e.Category)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<CategorySection>()
                .HasMany(e => e.Categories)
                .WithRequired(e => e.CategorySection)
                .HasForeignKey(e => e.SectionId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Competency>()
                .HasMany(e => e.Competencies1)
                .WithOptional(e => e.Competency1)
                .HasForeignKey(e => e.ParentId);

            modelBuilder.Entity<Course>()
                .HasMany(e => e.FAQs)
                .WithRequired(e => e.Course)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Course>()
                .HasMany(e => e.Sessions)
                .WithRequired(e => e.Course)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Course>()
                .HasMany(e => e.SessionStates)
                .WithRequired(e => e.Course)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Course>()
                .HasMany(e => e.UserCourses)
                .WithRequired(e => e.Course)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Session>()
                .HasMany(e => e.Materials)
                .WithRequired(e => e.Session)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UserProfile>()
                .HasMany(e => e.SessionStates)
                .WithRequired(e => e.UserProfile)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UserProfile>()
                .HasMany(e => e.UserCourses)
                .WithRequired(e => e.UserProfile)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<UserProfile>()
                .HasMany(e => e.webpages_Roles)
                .WithMany(e => e.UserProfiles)
                .Map(m => m.ToTable("webpages_UsersInRoles").MapLeftKey("UserId").MapRightKey("RoleId"));

            modelBuilder.Entity<UserProfile>()
                .HasMany(e => e.Experiences)
                .WithRequired(e => e.UserProfile)
                .WillCascadeOnDelete(true);


        }
    }
}
