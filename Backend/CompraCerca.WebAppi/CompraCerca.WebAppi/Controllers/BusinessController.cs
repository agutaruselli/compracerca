using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompraCerca.WebAppi.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CompraCerca.WebAppi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase
    {

        // GET api/Business/product
        [HttpGet("category/{id}")]
        public IActionResult GetBusinessMatchFromCategories()
        {
            BusinessDto a = new BusinessDto()
            {
                latitude = 34.45666,
                longitude = 56.4444,
                adress = "Avenida siempre viva 123",
                name = "el bar de juan"
            };

            BusinessDto b = new BusinessDto()
            {
                latitude = 34.45666,
                longitude = 56.4444,
                adress = "Avenida de los libertadores 123",
                name = "el bar del pepe"
            };

            BusinessDto c = new BusinessDto()
            {
                latitude = 34.45666,
                longitude = 56.4444,
                adress = "Avenida 123",
                name = "el bar ameno"
            };

            List<BusinessDto> businesses = new List<BusinessDto>();
            return Ok(businesses);
        }

        // GET api/Business/product
        [HttpGet("product/{product}")]
        public IActionResult GetBusinessMatchFromProduct()
        {
            BusinessDto a = new BusinessDto()
            {
                latitude = 34.45666,
                longitude = 56.4444,
                adress = "Avenida siempre viva 123",
                name = "el bar de juan"
            };

            BusinessDto b = new BusinessDto()
            {
                latitude = 34.45666,
                longitude = 56.4444,
                adress = "Avenida de los libertadores 123",
                name = "el bar del pepe"
            };

            BusinessDto c = new BusinessDto()
            {
                latitude = 34.45666,
                longitude = 56.4444,
                adress = "Avenida 123",
                name = "el bar ameno"
            };

            List<BusinessDto> businesses = new List<BusinessDto>();
            return Ok(businesses);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
