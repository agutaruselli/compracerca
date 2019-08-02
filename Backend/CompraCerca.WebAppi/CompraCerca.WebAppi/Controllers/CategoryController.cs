using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompraCerca.WebAppi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        // GET api/category/
        //On this first call we get all the father categories
        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            return Ok("Devolvio Negocio por categoria");
        }


        // GET api/category/id
        //On this call we get the info about this category and their
        //next sons
        [HttpGet("categories/{id}")]
        public IActionResult GetCategory()
        {
            return Ok("Devolvio Negocio por categoria");
        }
    }
}