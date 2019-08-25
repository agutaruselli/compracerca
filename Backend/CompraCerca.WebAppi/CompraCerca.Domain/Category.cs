using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompraCerca.Domain
{
    public class Category
    {
        public int Id { get; set; }
        public ICollection<Category> SubCategories { get; set; }
        public string Name { get; set; }
         
    }
}
