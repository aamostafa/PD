namespace PD.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("UserCourse")]
    public partial class UserCourse
    {
        public UserCourse()
        {
            SessionStates = new HashSet<SessionState>();
        }

        public int Id { get; set; }

        public int UserId { get; set; }

        public int CourseId { get; set; }

        public virtual Course Course { get; set; }

        public virtual ICollection<SessionState> SessionStates { get; set; }

        public virtual UserProfile UserProfile { get; set; }
    }
}
