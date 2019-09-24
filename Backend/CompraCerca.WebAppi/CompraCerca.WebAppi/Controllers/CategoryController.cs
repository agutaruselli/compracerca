using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompraCerca.BusinessLogic.Interface;
using CompraCerca.Domain;
using CompraCerca.WebAppi.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompraCerca.WebAppi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private ICategoryService CategoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.CategoryService = categoryService;
        }

        // GET api/category/
        //On this first call we get all the father categories
        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            List<Category> categories =  CategoryService.GetCategories().ToList();
            List<CategoryDto> categoriesDto = new List<CategoryDto>();
            foreach (Category category in categories) {
                CategoryDto categoryDto = new CategoryDto();
                categoriesDto.Add(categoryDto.GetCategoryDtoFromCategory(category));
            }
            return Ok(categoriesDto);
        }


        // GET api/category/id
        //On this call we get the info about this category and their
        //next sons
        [HttpGet("categories/{id}")]
        public IActionResult GetSubCategory(int id)
        {
            List<Category> categories = CategoryService.GetSubCategories(id).ToList();
            List<CategoryDto> categoriesDto = new List<CategoryDto>();
            foreach (Category category in categories)
            {
                CategoryDto categoryDto = new CategoryDto();
                categoriesDto.Add(categoryDto.GetCategoryDtoFromCategory(category));
            }
            return Ok(categoriesDto);
        }


        [HttpGet("init")]
        public IActionResult GetInit()
        {
            try
            {
                CategoryService.initiateCategories();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
            
        }
    }
}