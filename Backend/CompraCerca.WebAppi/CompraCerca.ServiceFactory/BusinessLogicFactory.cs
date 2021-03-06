﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CompraCerca.ServiceFactory
{
    public class BusinessLogicFactory
    {
        private string assemblyPath;

        public BusinessLogicFactory(string path)
        {
            assemblyPath = path;
        }

        public Type GetImplementation<T>() where T : class
        {
            var typeOfInterface = typeof(T);
            Type implementationType = GetInstanceOfInterface<T>();
            return implementationType;
        }

        private Type GetInstanceOfInterface<Interface>(params object[] args)
        {
            try
            {
                Assembly assembly = Assembly.LoadFile(assemblyPath);
                IEnumerable<Type> implementations = GetTypesInAssembly<Interface>(assembly);
                if (implementations.Count() <= 0)
                {
                    throw new NullReferenceException(assemblyPath + " don't contains Types that extend from " + nameof(Interface));
                }

                return implementations.First();
            }
            catch (Exception e)
            {
                throw new Exception("Can't load assembly " + assemblyPath, e);
            }
        }

        private static IEnumerable<Type> GetTypesInAssembly<Interface>(Assembly assembly)
        {
            List<Type> types = new List<Type>();
            foreach (var type in assembly.GetTypes())
            {
                var interfaceType = typeof(Interface);
                if (typeof(Interface).IsAssignableFrom(type))
                {
                    types.Add(type);
                }
            }
            return types;
        }
    }
}