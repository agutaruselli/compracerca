using CompraCerca.Domain;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace CompraCerca.WebServices
{
    public static class PredictCategory
    {

        // HttpClient is intended to be instantiated once per application, rather than per-use. See Remarks.
        private static readonly HttpClient client = new HttpClient();

        public static async Task<Category> GetCategory(string product)
        {

            // Call asynchronous network methods in a try/catch block to handle exceptions.

            string query = "https://api.mercadolibre.com/sites/MLU/category_predictor/predict?title=" + product;
            HttpResponseMessage response = await client.GetAsync(query);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();

            JObject result = JObject.Parse(responseBody);

            string restultCategory = "";
            foreach (JProperty prop in result.Properties())
            {
                if (prop.Name == "path_from_root")
                {
                    restultCategory = prop.Value.First.ToObject<ItemML>().name;
                }
            }

            return new Category() { Name = restultCategory };

        }
    }

    public class PredictionML
    {
        public string id { get; set; }
        public string name { get; set; }
        Path_from_root path_from_root { get; set; }
    }

    [DataContract]
    public class Path_from_root
    {
    }

    public class ItemML
    {
        public string id { get; set; }
        public string name { get; set; }
        public double prediction_probability { get; set; }
    }
}
