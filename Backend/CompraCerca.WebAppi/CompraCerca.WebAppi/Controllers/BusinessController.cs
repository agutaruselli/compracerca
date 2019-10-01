using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompraCerca.Domain;
using CompraCerca.WebAppi.DTOs;
using CompraCerca.BusinessLogic.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CompraCerca.WebAppi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        private IBusinessService businessService;

        public BusinessController(IBusinessService businessService) {
            this.businessService = businessService;
        }

        // GET api/Business/product
        [HttpGet("category/{id}")]
        public ActionResult GetBusinessMatchFromCategories(int id)
        {
            try
            {
                List<Business> businesses = businessService.GetBusinessFromCategories(id).ToList();
                List<BusinessDto> businessDtos = new List<BusinessDto>();

                foreach (Business business in businesses)
                {
                    BusinessDto businessDto = new BusinessDto();

                    businessDtos.Add(businessDto.GetBusinessDtoFromBusiness(business));
                }

                return Ok(businessDtos);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // GET api/Business/product
        [HttpGet("product/{product}")]
        public IActionResult GetBusinessMatchFromProduct(string product)
        {
            try
            {
                List<Business> businesses = businessService.GetBusinessFromProduct(product).ToList();
                List<BusinessDto> businessDtos = new List<BusinessDto>();

                foreach (Business business in businesses)
                {
                    BusinessDto businessDto = new BusinessDto();

                    businessDtos.Add(businessDto.GetBusinessDtoFromBusiness(business));
                }
                return Ok(businessDtos);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [HttpGet("init")]
        public IActionResult GetInit()
        {
            try
            {
                businessService.initiateBusiness();
                return Ok("Se iniciaron los datos correctamente");
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }
    }
}
