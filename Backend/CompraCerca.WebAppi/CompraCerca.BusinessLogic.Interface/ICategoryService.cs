using CompraCerca.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace CompraCerca.BusinessLogic.Interface
{
    public interface ICategoryService : IDisposable
    {
        IEnumerable<Category> GetCategories();
        IEnumerable<Category> GetSubCategories(int id);
        void initiateCategories();
    }
}
