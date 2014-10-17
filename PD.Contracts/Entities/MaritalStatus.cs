using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PD.Contracts.Entities
{
    [Table("MaritalStatus")]
    public class MaritalStatus
    {
        public int Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Status { get; set; }
    }
}