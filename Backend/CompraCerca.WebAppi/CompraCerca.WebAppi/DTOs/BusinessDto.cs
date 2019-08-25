using CompraCerca.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompraCerca.WebAppi.DTOs
{
    public class BusinessDto
    {
        public Double latitude { get; set; }
        public Double longitude { get; set; }
        public string address { get; set; }
        public string name { get; set; }

        public Business GetBusiness() {
            return new Business()
            {
                Adress = this.address,
                Latitude = this.latitude,
                Name = this.name
            };
        }

        public BusinessDto GetBusinessDtoFromBusiness(Business business) {
            return new BusinessDto()
            {
                address = business.Adress,
                latitude = business.Latitude,
                longitude = business.Longitude,
                name = business.Name
            };
        }
    }
}
