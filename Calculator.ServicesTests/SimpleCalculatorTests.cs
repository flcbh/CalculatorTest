using Microsoft.VisualStudio.TestTools.UnitTesting;
using Calculator.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Calculator.ServicesTests;

namespace Calculator.Services.Tests
{
    [TestClass()]
    public class SimpleCalculatorTests
    {
        SimpleCalculatorTestService service;
        public SimpleCalculatorTests()
        {
            service = new SimpleCalculatorTestService();    
        }

        [TestMethod()]
        public void AddTest()
        {
            var result = service.Add(1,1);
            Assert.AreEqual(result, 2);
        }

        [TestMethod()]
        public void DivideTest()
        {
            var result = service.Divide(1, 1);
            Assert.AreEqual(result, 1);
        }

        [TestMethod()]
        public void MultiplicationTest()
        {
            var result = service.Multiplication(1, 1);
            Assert.AreEqual(result, 1);
        }

        [TestMethod()]
        public void SubtractTest()
        {
            var result = service.Subtract(1, 1);
            Assert.AreEqual(result, 0);
        }
    }
}