using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompraCerca.WebAppi.DTOs
{
    public class CategoryDto
    {
        public int Father { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
