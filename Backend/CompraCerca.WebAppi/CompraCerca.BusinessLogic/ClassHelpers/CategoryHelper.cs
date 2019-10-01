using CompraCerca.DataAccess.Interface;
using CompraCerca.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CompraCerca.BusinessLogic.ClassHelpers
{
    public class CategoryHelper
    {
        private IRepository<Category> categoryRepository;

        public CategoryHelper(IRepository<Category> categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        public int getIdCategory(string categoryName) {
            Category category = categoryRepository.GetByCondition(a => a.Name.Contains(categoryName)).ToList().FirstOrDefault();
            return category != null ? category.Id : 0;
        }
    }
}
