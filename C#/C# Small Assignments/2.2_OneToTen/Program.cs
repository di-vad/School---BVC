using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace OneToTen
{
    internal class Program
    {
        //With that input, the program should output the corresponding number word (e.g., 1 = "one", 2 = "two", etc.).
        //Use an if-else or switch statement to handle the different cases.

        static void NumberInWords(int number)
        {
            switch (number)
            {
                case 1: Console.WriteLine($"The word representation of {number} is: one"); break;
                case 2: Console.WriteLine($"The word representation of {number} is: two"); break;
                case 3: Console.WriteLine($"The word representation of {number} is: three"); break;
                case 4: Console.WriteLine($"The word representation of {number} is: four"); break;
                case 5: Console.WriteLine($"The word representation of {number} is: five"); break;
                case 6: Console.WriteLine($"The word representation of {number} is: six"); break;
                case 7: Console.WriteLine($"The word representation of {number} is: seven"); break;
                case 8: Console.WriteLine($"The word representation of {number} is: eight"); break;
                case 9: Console.WriteLine($"The word representation of {number} is: nine"); break;
                case 10: Console.WriteLine($"The word representation of {number} is: ten"); break;
            }
        }

        //The application should then take that same input, from step 1, and sum of all the numbers from 1 to the input number.
        //Use a for loop to iterate through the numbers and add them up.

        static void SumOfNum(int number)
        {
            int start = number - number + 1;
            int end = number;

            for (int i = 0, number2 = number - 1; i < number; i++)
            {
                number = number + number2;
                number2--;
                if (number2 == 0)
                    Console.WriteLine($"The sum of numbers from {start} to {end} is: {number}");
            }
        }

        //Finally, the application should take a user input of a string and output the reverse of the string.
        //Use a conditional operator to check if the input string is not null or empty before reversing it.

        static void ReverseString(string s)
        {
            bool result = s.All(char.IsLetter); //the simplest way to check user input string if they were composed of non-letters of the alphabet
            if (s == null || s == "" || !result) //checking if the input string is null or empty
            {
                s = "Invalid input.";
            }
            else
            {
                string reverse = string.Empty;
                for (int i = s.Length - 1; i >= 0; i--)
                {
                    reverse = reverse + s[i];
                }
                s = reverse;
            }    
            
            Console.WriteLine($"Reversed string: {s}");
        }

        static void Main(string[] args)
        {
            Console.WriteLine("Enter a number between 1 and 10:");
            int number;
            while (true)
            {
                if (int.TryParse(Console.ReadLine(), out number) && number >= 1 && number <= 10)
                {
                    // Process valid number input
                    NumberInWords(number);
                    break;
                }
                else
                {
                    Console.WriteLine("Not a valid input. Please enter a number between 1 and 10:");
                }
            }

            // Calculate the sum of numbers from 1 to the input number
            SumOfNum(number);

            Console.WriteLine("Enter a string:");
            string input = Console.ReadLine();

            ReverseString(input);
        }
    }
}
