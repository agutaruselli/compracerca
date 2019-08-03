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
                id = 1,
                father = 0,
                name = "Servicios"
            };
            CategoryDto b = new CategoryDto()
            {
                id = 2,
                father = 0,
                name = "Automoviles"
            };
            CategoryDto c = new CategoryDto()
            {
                id = 3,
                father = 0,
                name = "Hogar"
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
                id = 4,
                father = 1,
                name = "Tinorerias"
            };
            CategoryDto b = new CategoryDto()
            {
                id = 5,
                father = 1,
                name = "Vidrerias"
            };
            CategoryDto c = new CategoryDto()
            {
                id = 6,
                father = 1,
                name = "Whiskeria"
            };

           

            List<CategoryDto> subCategories = new List<CategoryDto>()
            {
                a,b,c
            };
            return Ok(subCategories);
        }
    }
}