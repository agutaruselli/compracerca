using CompraCerca.Domain;
using Microsoft.EntityFrameworkCore;
using Report.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace CompraCerca.DataAccess.Repository.Domain
{
    public class CategoryRepository: Repository<Category>
    {
        public CategoryRepository(DbContext context) : base(context) { }

        public override IEnumerable<Category> GetAll()
        {
            return Context.Set<Category>();
        }

        public override IEnumerable<Category> GetByCondition(Expression<Func<Category, bool>> expression)
        {
            return Context.Set<Category>().Where(expression);
        }
    }
}
