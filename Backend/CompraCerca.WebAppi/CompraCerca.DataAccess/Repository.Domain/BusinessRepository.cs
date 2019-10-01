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
    public class BusinessRepository : Repository<Business>
    {
        public BusinessRepository(DbContext context) : base(context) { }

        public override IEnumerable<Business> GetAll()
        {
            return Context.Set<Business>().Include("Categories");
        }

        public override IEnumerable<Business> GetByCondition(Expression<Func<Business, bool>> expression)
        {
            return Context.Set<Business>().Include("Categories").Where(expression);
        }

        public override Business GetFirst(Expression<Func<Business, bool>> expression)
        {
            return Context.Set<Business>().Include("Categories").Include(c => c.Categories).FirstOrDefault(expression);
        }

        public override void Add(Business business)
        {
            foreach (Category category in business.Categories)
            {
                Context.Attach(category);
            }
            Context.Set<Business>().Add(business);
            this.Save();
        }
    }
}
