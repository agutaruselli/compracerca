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
        public IActionResult GetBusinessMatchFromCategories(int id)
        {
            List<Business> businesses = businessService.GetBusinessFromCategories(id).ToList();
            List<BusinessDto> businessDtos = new List<BusinessDto>();

            foreach (Business business in businesses) {
                BusinessDto businessDto = new BusinessDto();

                businessDtos.Add(businessDto.GetBusinessDtoFromBusiness(business));
            }

            return Ok(businessDtos);
        }

        // GET api/Business/product
        [HttpGet("product/{product}")]
        public IActionResult GetBusinessMatchFromProduct(string product)
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

        [HttpGet("init")]
        public IActionResult GetInit()
        {
            try
            {
               // businessService.initiateBusiness();
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }

        }
    }
}
