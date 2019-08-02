using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CompraCerca.WebAppi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/Business/product
        [HttpGet("{id}/categories")]
        public IActionResult GetBusinessMatchFromCategories()
        {
            return Ok("Devolvio Negocio por categoria");
        }

        // GET api/Business/product
        [HttpGet("product")]
        public IActionResult GetBusinessMatchFromProduct(string nameOfProduct)
        {
            return Ok("Devolvio Negocio por nombre del producto");
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
