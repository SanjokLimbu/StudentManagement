using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace StudentManagementLibrary.Model
{
    public class StudentModel
    {
        [Required]
        public Guid StudentId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public Guid CollegeId { get; set; }
        [Required]
        public Guid FacultyId { get; set; }
        [Required]
        public string UserName { get; set; }
    }
}
