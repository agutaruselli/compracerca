using CompraCerca.Domain;
using System;

namespace CompraCerca.WebServices.Interface
{
    public interface IPredictCategory : IDisposable
    {
        Category GetCategory(string product);
    }
}
