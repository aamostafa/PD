namespace PD.Contracts.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Course")]
    public partial class Course
    {
        public Course()
        {
            FAQs = new HashSet<FAQ>();
            Sessions = new HashSet<Session>();
            SessionStates = new HashSet<SessionState>();
            UserCourses = new HashSet<UserCourse>();
        }

        public int ID { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        public string ImageUrl { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime StartDate { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime EndDate { get; set; }

        [StringLength(255)]
        public string Instructor { get; set; }

        public string Description { get; set; }

        public int CategoryId { get; set; }

        public int? NumberOfSeats { get; set; }

        public int? NumberOfReservedSeats { get; set; }

        public bool IsFacetoFace { get; set; }

        [StringLength(255)]
        public string Location { get; set; }

        public string SessionsOccur { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? PublishingDate { get; set; }

        public string Details { get; set; }

        public string TargetAudience { get; set; }

        public string Participants { get; set; }

        public string RequiredBackground { get; set; }
        
        public string Competencies { get; set; }

        public virtual Category Category { get; set; }

        public virtual ICollection<FAQ> FAQs { get; set; }

        public virtual ICollection<Session> Sessions { get; set; }

        public virtual ICollection<SessionState> SessionStates { get; set; }

        public virtual ICollection<UserCourse> UserCourses { get; set; }


    }
}
