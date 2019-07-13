
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace CompraCerca.DataAccess.Interface
{
    public interface IRepository<T> : IDisposable
    {
        IEnumerable<T> GetAll();
        IEnumerable<T> GetByCondition(Expression<Func<T, bool>> expression);
        T GetFirst(Expression<Func<T, bool>> expression);
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        void Save();
        void ClearItems();
      
   
    }
}