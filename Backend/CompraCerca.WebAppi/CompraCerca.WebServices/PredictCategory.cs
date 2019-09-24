using CompraCerca.Domain;
using CompraCerca.WebServices.Interface;
using System;
using System.Net.Http;

namespace CompraCerca.WebServices
{
    public class PredictCategory : IPredictCategory
    {
        private IPredictCategory predictCategory;

        // HttpClient is intended to be instantiated once per application, rather than per-use. See Remarks.
        static readonly HttpClient client = new HttpClient();

        public PredictCategory(IPredictCategory predictCategory) {
            this.predictCategory = predictCategory;
        }

        public PredictCategory()
        {
            this.predictCategory = new PredictCategory();
        }

        public Category GetCategory(string product)
        {
            
            // Call asynchronous network methods in a try/catch block to handle exceptions.

                //HttpResponseMessage response = await client.GetAsync("http://www.contoso.com/");
                //response.EnsureSuccessStatusCode();
                //string responseBody = await response.Content.ReadAsStringAsync();
                // Above three lines can be replaced with new helper method below
                // string responseBody = await client.GetStringAsync(uri);

               // Console.WriteLine(responseBody);
                return new Category();

        }

        public void Dispose()
        {
            predictCategory.Dispose();
        }
    }
}
