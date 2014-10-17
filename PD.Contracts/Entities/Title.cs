namespace PD.Contracts.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using System.Web;

    [Table("Title")]
    public class Title
    {
        public int Id { get; set; }

        [Required]
        [StringLength(80)]
        public string Name { get; set; }
    }
}