using Calculator.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculator.ServicesTests
{
    internal class SimpleCalculatorTestService
    {
        SimpleCalculator calculator;

        public SimpleCalculatorTestService()
        {
            if(calculator == null) {
                calculator = new SimpleCalculator();
            }
        }

        public int Add(int v1, int v2)
        {
            return calculator.Add(v1, v2);
        }

        public int Divide(int start, int amount)
        {
            return calculator.Divide(start, amount);
        }

        public int Multiplication(int start, int amount)
        {
            return calculator.Multiplication(start, amount);
        }

        public int Subtract(int start, int amount)
        {
            return calculator.Subtract(start, amount);
        }

    }
}
