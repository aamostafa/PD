namespace PD.Contracts.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("UserProfile")]
    public partial class UserProfile
    {
        public UserProfile()
        {
            SessionStates = new HashSet<SessionState>();
            UserCourses = new HashSet<UserCourse>();
            webpages_Roles = new HashSet<webpages_Roles>();
            Experiences = new HashSet<Experience>();
        }

        [Key]
        public int UserId { get; set; }

        [Required]
        [StringLength(500)]
        public string UserName { get; set; }

        [Required]
        [StringLength(500)]
        public string Email { get; set; }

        [StringLength(500)]
        public string ImageUrl { get; set; }

        public string About { get; set; }

        public string School { get; set; }

        public string Interests { get; set; }

        public string LinkedInUrl { get; set; }

        public string GoogleUrl { get; set; }

        public string FacebookUrl { get; set; }

        public string TwitterUrl { get; set; }

        [Required]
        public DateTime JoinedDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? BirthDay { get; set; }

        public string Gender { get; set; }

        public int TitleId { get; set; }
        public virtual Title Title { get; set; }

        public int? CountryId { get; set; }
        public virtual Country Country { get; set; }

        public int? RegionId { get; set; }
        public virtual Region Region { get; set; }

        public int? MaritalStatusId { get; set; }
        public virtual MaritalStatus MaritalStatus { get; set; }

        public virtual ICollection<SessionState> SessionStates { get; set; }

        public virtual ICollection<UserCourse> UserCourses { get; set; }

        public virtual ICollection<webpages_Roles> webpages_Roles { get; set; }

        public virtual ICollection<Experience> Experiences { get; set; }
    }
}
