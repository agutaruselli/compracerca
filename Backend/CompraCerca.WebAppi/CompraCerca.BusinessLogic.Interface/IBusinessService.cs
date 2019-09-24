using CompraCerca.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace CompraCerca.BusinessLogic.Interface
{
    public interface IBusinessService: IDisposable
    {
        ICollection<Business> GetBusinessFromCategories(int idCategory);
        ICollection<Business> GetBusinessFromProduct(string product);
        void initiateBusiness();
    }
}
