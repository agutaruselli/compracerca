using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CompraCerca.Domain
{
    public class Business
    {
        public Guid Id { get; set; }
        public Double Latitude { get; set; }
        public Double Longitude { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }
        public int Telephone { get; set; }
        public string WebSite { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}
