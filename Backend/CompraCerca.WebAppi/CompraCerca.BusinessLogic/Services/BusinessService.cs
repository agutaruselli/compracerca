using CompraCerca.BusinessLogic.Interface;
using CompraCerca.DataAccess.Interface;
using CompraCerca.Domain;
using CompraCerca.WebServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CompraCerca.BusinessLogic.Services
{
    public class BusinessService : IBusinessService
    {
        private IRepository<Business> businessRepository;

        public BusinessService(IRepository<Business> businessRepository) {
            this.businessRepository = businessRepository;
        }

        public ICollection<Business> GetBusinessFromCategories(int idCategory)
        {
            return businessRepository.GetByCondition(x => x.Categories.Any(y => y.Id == idCategory)).ToList();
        }

        public ICollection<Business> GetBusinessFromProduct(string product)
        {

            PredictCategory pCateg = new PredictCategory();
            Category categoryPredicted = pCateg.GetCategory(product);

            return this.GetBusinessFromCategories(categoryPredicted.Id);
        }

        public void initiateBusiness()
        {
            Business a = new Business() {
                Id = Guid.NewGuid(),
                Adress = "Av Gral Rondeau 1594, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>(){ new Category() { Id= 2 } },
                Image = "",
                Latitude = -34.901441,
                Longitude = -56.191789,
                Name = "figueroa autopartes",
                Telephone = 29092518,
                WebSite = "http://www.caraccesorios.uy/#!/-bienvenidos/"
            };
            Business b = new Business() {
                Id = Guid.NewGuid(),
                Adress = "Maldonado 1025, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>() { new Category() { Id = 1 } },
                Image = "",
                Latitude = -34.9095761,
                Longitude = -56.1930538,
                Name = "Sun",
                Telephone = 29009934,
                WebSite = "https://sun.uy/"
            };
            Business c = new Business() {
                Id = Guid.NewGuid(),
                Adress = "San José 1101, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>() { new Category() { Id = 10101 } },
                Image = "",
                Latitude = -34.9094254,
                Longitude = -56.1954537,
                Name = "Antel",
                Telephone = 08006611,
                WebSite = "tienda.antel.com.uy"
            };
            List<Business> businesses = new List<Business>() { a, b, c };
            foreach (Business bsnessnew in businesses)
            {
                businessRepository.Add(bsnessnew);
            }
        }

        public void Dispose()
        {
            businessRepository.Dispose();
        }
    }
}
