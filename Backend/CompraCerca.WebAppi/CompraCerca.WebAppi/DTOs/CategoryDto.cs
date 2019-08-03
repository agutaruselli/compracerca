using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompraCerca.WebAppi.DTOs
{
    public class CategoryDto
    {
        public int father { get; set; }
        public int id { get; set; }
        public string name { get; set; }
    }
}
