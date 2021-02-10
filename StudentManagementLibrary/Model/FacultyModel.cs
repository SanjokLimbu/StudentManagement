using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementLibrary.Model
{
    public class FacultyModel
    {
        public Guid FacultyId { get; set; }
        public string FacultyName { get; set; }
        public Guid StudentId { get; set; }
        public Guid CollegeId { get; set; }
    }
}
