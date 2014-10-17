namespace PD.Contracts.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("SessionState")]
    public partial class SessionState
    {
        public int Id { get; set; }

        public int? userID { get; set; }

        //[Required]
        public string Sessions { get; set; }

        public int? CourseId { get; set; }

        public int? UserCourseId { get; set; }

        public virtual Course Course { get; set; }

        public virtual UserProfile UserProfile { get; set; }

        public virtual UserCourse UserCourse { get; set; }
    }
}
