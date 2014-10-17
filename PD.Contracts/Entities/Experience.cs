namespace PD.Contracts.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;


    public class Experience
    {
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string OrganisationName { get; set; }

        [Required]
        public string Title { get; set; }

        public string JobDescription { get; set; }

        public string ImageUrl { get; set; }

        public string Location { get; set; }
        
        public string YearsOfExperience { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime StartDate { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime? EndDate { get; set; }


        [ForeignKey("UserProfile")]
        public int UserProfileId { get; set; }

        public virtual UserProfile UserProfile { get; set; }
    }
}