using System;
using Microsoft.Extensions.DependencyInjection;

namespace CompraCerca.ServiceFactory
{
    public static class BLServiceCollectionServiceExtensions
    {
        public static IServiceCollection AddLogic<T>(this IServiceCollection service, string path)
            where T : class
        {
            BusinessLogicFactory businessLogicFactory = new BusinessLogicFactory(path);
            Type typeToRegister = businessLogicFactory.GetImplementation<T>();
            return service.AddScoped(typeof(T), typeToRegister);
        }

        public static IServiceCollection AddRepository<T>(this IServiceCollection service, string path)
            where T : class
        {
            RepositoryFactory repositoryFactory = new RepositoryFactory(path);
            Type typeToRegister = repositoryFactory.GetImplementation<T>();
            return service.AddScoped(typeof(T), typeToRegister);
        }

        public static IServiceCollection AddRepository(this IServiceCollection service, Type type, string path)
        {
            RepositoryFactory repositoryFactory = new RepositoryFactory(path);
            Type typeToRegister = repositoryFactory.GetImplementation(type);
            return service.AddScoped(type, typeToRegister);
        }
    }
}