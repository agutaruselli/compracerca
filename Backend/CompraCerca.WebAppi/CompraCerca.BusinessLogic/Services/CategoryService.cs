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
            ///////////////////////////////////////////////////////////////////////////
            Category accesoriosParaCelulares = new Category()
            {
                Id = 102,
                Name = "Accesorios para celulares",
                SubCategories = null
            };

            Category celularesYSmartphones = new Category()
            {
                Id = 101,
                Name = "Celulares y telefonía",
                SubCategories = null
            };

            Category tecnologia = new Category()
            {
                Id = 1,
                Name = "Tecnología",
                SubCategories = new List<Category>() { celularesYSmartphones, accesoriosParaCelulares }

            };
            /////////////////////////////////////////////////////////////////
            Category paraAutosYCamionetas = new Category()
            {
                Id = 202,
                Name = "Para autos y camionetas",
                SubCategories = null
            };

            Category paraMotos = new Category()
            {
                Id = 201,
                Name = "Para motos",
                SubCategories = null
            };

            Category accesoriosParaVehiculos = new Category()
            {
                Id = 2,
                Name = "Accesorios para vehículos",
                SubCategories = new List<Category>() { paraMotos, paraAutosYCamionetas }

            };
            /////////////////////////////////////////////////////////////////////////////////////////////////////
            Category articulosDePeluqueria = new Category()
            {
                Id = 302,
                Name = "Articulos de peluquería",
                SubCategories = null
            };

            Category tratamientos = new Category()
            {
                Id = 301,
                Name = "Tramientos",
                SubCategories = null
            };

            Category saludYBelleza = new Category()
            {
                Id = 3,
                Name = "Salud y belleza",
                SubCategories = new List<Category>() { tratamientos, articulosDePeluqueria }

            };
            ///////////////////////////////////////////////////////////////////////////////////
            ///

            Category accesorios = new Category()
            {
                Id = 402,
                Name = "Accesorios",
                SubCategories = null
            };

            Category bicletas = new Category()
            {
                Id = 401,
                Name = "Bicletas",
                SubCategories = null
            };

            Category deportesYAireLibre = new Category()
            {
                Id = 4,
                Name = "Deportes y aire libre",
                SubCategories = new List<Category>() { accesorios, bicletas }

            };
            //////////////////////////////////////////////////////////////////////
            ///
            Category climatizacion = new Category()
            {
                Id = 502,
                Name = "Climatización",
                SubCategories = null
            };

            Category refrigeracion = new Category()
            {
                Id = 501,
                Name = "Refigeración",
                SubCategories = null
            };

            Category hogarYElectrodomesticos = new Category()
            {
                Id = 5,
                Name = "Hogar y electrodomésticos",
                SubCategories = new List<Category>() { refrigeracion, climatizacion }

            };
            ////////////////////////////////////////////////////////////////////////////
            ///
            Category equipamientoParaOficinas = new Category()
            {
                Id = 602,
                Name = "Equipamiento para oficinas",
                SubCategories = null
            };

            Category industriaGastronomica = new Category()
            {
                Id = 601,
                Name = "Industria gastronómica",
                SubCategories = null
            };

            Category herramientasEIndustrias = new Category()
            {
                Id = 6,
                Name = "Herramientas e industrias",
                SubCategories = new List<Category>() { industriaGastronomica, equipamientoParaOficinas }

            };
            ////////////////////////////////////////////////////////////////////////////////////
            ///
            Category juegosYjuguetesParaBebes = new Category()
            {
                Id = 702,
                Name = "Juegos y juguetes para bebés",
                SubCategories = null
            };

            Category paseoDelBebe = new Category()
            {
                Id = 701,
                Name = "Paseo del bebe",
                SubCategories = null
            };

            Category juguetesYBebes = new Category()
            {
                Id = 7,
                Name = "Juguetes y bebés",
                SubCategories = new List<Category>() { paseoDelBebe, juegosYjuguetesParaBebes }

            };




            List<Category> categories = new List<Category>() {
                tecnologia,
                accesoriosParaVehiculos,
                saludYBelleza,
                deportesYAireLibre,
                hogarYElectrodomesticos,
                herramientasEIndustrias,
                juguetesYBebes
            };

            foreach (var item in categories)
            {
                categoryRepository.Add(item);
            }
        }
    }
}
