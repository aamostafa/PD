namespace PD.Contracts.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Competency
    {
        public Competency()
        {
            Competencies1 = new HashSet<Competency>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [Required]
        [StringLength(160)]
        public string Name { get; set; }

        public int? ParentId { get; set; }

        public virtual ICollection<Competency> Competencies1 { get; set; }

        public virtual Competency Competency1 { get; set; }
    }
}
