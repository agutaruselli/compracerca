using CompraCerca.BusinessLogic.Interface;
using CompraCerca.DataAccess.Interface;
using CompraCerca.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace CompraCerca.BusinessLogic.Services
{
    public class CategoryService : ICategoryService
    {
        private IRepository<Category> categoryRepository;

        public CategoryService(IRepository<Category> categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        public void Dispose()
        {
            categoryRepository.Dispose();
        }

        public IEnumerable<Category> GetCategories()
        {
            return categoryRepository.GetByCondition(a => !a.Id.ToString().Contains("0"));
        }

        public IEnumerable<Category> GetSubCategories(int id)
        {
            string preFix = id.ToString();
            return categoryRepository.GetByCondition(a => a.Id.ToString().StartsWith(preFix) && Regex.Matches(a.Id.ToString().Remove(0, preFix.Length), "0").Count == 1);
        }

        public void initiateCategories()
        {
            Category computacion = new Category()
            {
                Id = 102,
                Name = "Computación",
                SubCategories = null
            };

            Category celularesYSmartphones = new Category()
            {
                Id = 10101,
                Name = "Celulares y smartphones",
                SubCategories = null
            };

            Category celularesYTelefonia = new Category()
            {
                Id = 101,
                Name = "Celulares y telefonía",
                SubCategories = new List<Category>() { celularesYSmartphones }
            };

            Category tecnologia = new Category()
            {
                Id = 1,
                Name = "Tecnología",
                SubCategories = new List<Category>() { celularesYTelefonia, computacion }
                
            };
            categoryRepository.Add(tecnologia);
        }
    }
}
