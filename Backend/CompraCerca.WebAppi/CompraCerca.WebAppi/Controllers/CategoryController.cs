using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompraCerca.WebAppi.DTOs;
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
            CategoryDto a = new CategoryDto()
            {
                Id = 1,
                Father = 0,
                Name = "Servicios"
            };
            CategoryDto b = new CategoryDto()
            {
                Id = 2,
                Father = 0,
                Name = "Automoviles"
            };
            CategoryDto c = new CategoryDto()
            {
                Id = 3,
                Father = 0,
                Name = "Hogar"
            };
            List<CategoryDto> padres = new List<CategoryDto>() { a, b, c };
            return Ok(padres);
        }


        // GET api/category/id
        //On this call we get the info about this category and their
        //next sons
        [HttpGet("categories/{id}")]
        public IActionResult GetCategory()
        {
            CategoryDto a = new CategoryDto()
            {
                Id = 4,
                Father = 1,
                Name = "Tinorerias"
            };
            CategoryDto b = new CategoryDto()
            {
                Id = 5,
                Father = 1,
                Name = "Vidrerias"
            };
            CategoryDto c = new CategoryDto()
            {
                Id = 6,
                Father = 1,
                Name = "Whiskeria"
            };

           

            List<CategoryDto> subCategories = new List<CategoryDto>()
            {
                a,b,c
            };
            return Ok(subCategories);
        }
    }
}