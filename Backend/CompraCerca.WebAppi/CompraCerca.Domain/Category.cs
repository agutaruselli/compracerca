using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompraCerca.Domain
{
    public class Category
    {
        [Key]
        public Guid Id { get; set; }
        public Guid Father { get; set; }
        public string Name { get; set; }
    }
}
