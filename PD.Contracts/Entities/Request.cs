
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace PD.Contracts.Entities
{
    [Table("Request")]
    public class Request
    {
        public int Id { get; set; }



        public int? MentorID { get; set; }

        public string Status { get; set; }

        public int CourseId { get; set; }
        public virtual Course Course { get; set; }

        public int UserProfileId { get; set; }
        public virtual UserProfile UserProfile { get; set; }

    }
}