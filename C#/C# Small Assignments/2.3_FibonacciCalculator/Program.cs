using System;
using System.Globalization;

namespace FibonacciCalculator
{
    internal class Program
    {
        static void checkFiboRange (int n)
        {
            if (n > 92 || n++ > 93)
            {
                Console.WriteLine("Value exceeded data range!\nPlease try again with a small number!");

            }

        }
        static void FibonacciCalculator(int n)
        {
            long zero = 0;
            long one = 1;
            int firstterm = 1;
            int secondterm = 2;

            
                if (n == 1)
                {
                    Console.WriteLine($"{zero} (first term)");
                }
                else
                {
                    Console.WriteLine($"{zero} (first term)\n{one} (second term)");
                }

                for (int i = 2; i < n; i++)
                {
                    if (n < 93)
                    {
                        long product = zero += one;
                        zero = one; one = product;

                        Console.WriteLine($"The sum of term {firstterm} and term {secondterm} is {product}");

                        firstterm++;
                        secondterm++;
                    }
                    else 
                    {

                        long product = zero += one;
                        zero = one; one = product;

                        if (i < 12)
                            Console.WriteLine($"The sum of term {firstterm} and term {secondterm} is {product}");

                        firstterm++;
                        secondterm++;

                        if (product == 89)
                            Console.WriteLine("..............................\n..............................");

                        if (firstterm > 88 && firstterm < 93)
                            Console.WriteLine($"The sum of term {firstterm - 1} and term {secondterm - 1} is {product}");

                    }
                }
                checkFiboRange(n);

        }

        static int GetInput()
        {
            string error = "Please enter a positive integer.";
            Console.WriteLine("Please enter the number of terms in the Fibonacci sequence you'd like to calculate: ");

            string input = Console.ReadLine();
            int number;

            if (int.TryParse(input, out number))
            {
                return number;
            }
            else 
            {
                Console.WriteLine(error);
                return -1;
            }
        }
        static void Main(string[] args)
        {
            int input = GetInput();

            if (input != -1)
            FibonacciCalculator(input);

        }
    }
}
