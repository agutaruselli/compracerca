using CompraCerca.BusinessLogic.ClassHelpers;
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
        private CategoryHelper cat;

        public BusinessService(IRepository<Business> businessRepository, IRepository<Category> categoryRepository)
        {
            this.businessRepository = businessRepository;
            this.cat = new CategoryHelper(categoryRepository);
        }

        public ICollection<Business> GetBusinessFromCategories(int idCategory)
        {
            return businessRepository.GetByCondition(x => x.Categories.Any(y => y.Id == idCategory)).ToList();
        }

        public ICollection<Business> GetBusinessFromProduct(string product)
        {
            Category categoryPredicted = PredictCategory.GetCategory(product).Result;
            int idCategory = cat.getIdCategory(categoryPredicted.Name);
            return this.GetBusinessFromCategories(idCategory);
        }

        public void initiateBusiness()
        {
            Business a = new Business()
            {
                Id = Guid.NewGuid(),
                Adress = "Mercedes 1249, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>(){ new Category() { Id= 101 } },
                Image = "",
                Latitude = -34.903768,
                Longitude = -56.189337,
                Name = "Dr iphone",
                Telephone = 29072518,
                WebSite = "http://www.facebook.com/drphone/"
            };
            Business b = new Business()
            {
                Id = Guid.NewGuid(),
                Adress = "Maldonado 1025, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>() { new Category() { Id = 102 } },
                Image = "",
                Latitude = -34.903221,
                Longitude = -56.194016,
                Name = "Pepe accesorios",
                Telephone = 29049934,
                WebSite = "http://www.facebook.com/acclodepepe/"
            };
            Business c = new Business()
            {
                Id = Guid.NewGuid(),
                Adress = "Durazno 1199, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>() { new Category() { Id = 201} },
                Image = "",
                Latitude = -34.910556,
                Longitude = -56.190749,
                Name = "Taller lo de cacho",
                Telephone = 08006611,
                WebSite = "No disponible"
            };
            Business d = new Business()
            {
                Id = Guid.NewGuid(),
                Adress = "Galicia 1377, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>() { new Category() { Id = 301 } },
                Image = "",
                Latitude = -34.899828,
                Longitude = -56.186934,
                Name = "Peluquería jessica valdivieso",
                Telephone = 29018763,
                WebSite = "No disponible"
            };
            Business e = new Business()
            {
                Id = Guid.NewGuid(),
                Adress = "Cerro Largo 902, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>() { new Category() { Id = 302 } },
                Image = "",
                Latitude = -34.901501,
                Longitude = -56.196597,
                Name = "Rambona",
                Telephone = 29082312,
                WebSite = "No disponible"
            };
            Business f = new Business()
            {
                Id = Guid.NewGuid(),
                Adress = "Convención 1352, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>() { new Category() { Id = 201 } },
                Image = "",
                Latitude = -34.905968,
                Longitude = -56.197064,
                Name = "Biciletas y accesorios",
                Telephone = 29083232,
                WebSite = "No disponible"
            };
            Business g = new Business()
            {
                Id = Guid.NewGuid(),
                Adress = "Zelmar Michelini 1192, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>() { new Category() { Id = 601 }},
                Image = "",
                Latitude = -34.908876,
                Longitude = -56.189884,
                Name = "Rostiseria lo de tere",
                Telephone = 29043232,
                WebSite = "No disponible"
            };
            Business h = new Business()
            {
                Id = Guid.NewGuid(),
                Adress = "Durazno 1102, 11100 Montevideo, Departamento de Montevideo",
                Categories = new List<Category>() { new Category() { Id = 602 } },
                Image = "",
                Latitude = -34.910717,
                Longitude = -56.191528,
                Name = "Papeleria y fotocopias benteke",
                Telephone = 29043232,
                WebSite = "No disponible"
            };
           
           
            List<Business> businesses = new List<Business>() { a, b, c, d,e,f,g,h};
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
