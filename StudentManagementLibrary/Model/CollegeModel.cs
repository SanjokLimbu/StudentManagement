using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StudentManagementLibrary.Model
{
    public class CollegeModel
    {
        [Required]
        public Guid CollegeId { get; set; }
        [Required]
        public string CollegeName { get; set; }
        [Required]
        public Guid FacultyId { get; set; }
    }
}
