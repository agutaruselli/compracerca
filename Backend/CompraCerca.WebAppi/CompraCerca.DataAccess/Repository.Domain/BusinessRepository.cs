using CompraCerca.Domain;
using Microsoft.EntityFrameworkCore;
using Report.DataAccess;
using System;
using System.Collections.Generic;
using System.Text;

namespace CompraCerca.DataAccess.Repository.Domain
{
    public class BusinessRepository : Repository<Business>
    {
        public BusinessRepository(DbContext context) : base(context) { }

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
