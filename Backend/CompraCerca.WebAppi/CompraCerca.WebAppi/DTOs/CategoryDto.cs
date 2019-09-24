using CompraCerca.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompraCerca.WebAppi.DTOs
{
    public class CategoryDto
    {
        public List<CategoryDto> subCategories { get; set; }
        public int id { get; set; }
        public string name { get; set; }

        public CategoryDto GetCategoryDtoFromCategory(Category category)
        {
            List<CategoryDto> subCategories = category.SubCategories != null? getSetSubCategories(category.SubCategories.ToList()):null;
            return new CategoryDto()
            {
                 name = category.Name,
                 id = category.Id,
                 subCategories = subCategories
            };
        }

        private List<CategoryDto> getSetSubCategories(List<Category> subCategories) {
            List<CategoryDto> categoryDtos = new List<CategoryDto>();

            foreach (Category category in subCategories) {
                CategoryDto categoryDto = new CategoryDto()
                {
                    id = category.Id,
                    name = category.Name,
                    subCategories = null
                };
            }

            return categoryDtos;
        }
    }
}
