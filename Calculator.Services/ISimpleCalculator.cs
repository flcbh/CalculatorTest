using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Calculator.Services
{
    public interface ISimpleCalculator
    {
        public int Add(int start, int amount);
        public int Subtract(int start, int amount);
        public int Multiplication(int start, int amount);
        public int Divide(int start, int amount);  

    }
}
