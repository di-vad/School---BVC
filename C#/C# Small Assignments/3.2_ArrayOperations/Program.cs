namespace ArrayOperations
{
    internal class Program
    {
        
        static void ManipulateArrayElements (int input)
        {
            while (input == 0 || input > 30 || input < 0)
            {
                Console.WriteLine("Invalid input. Please enter a number between 1 and 30:");
                input = int.Parse(Console.ReadLine());
            }

            int[] ints = new int[input];

            for (int i = 0; i < ints.Length; i++)
            {
                bool validInput = false;
                while (!validInput)
                {
                    Console.WriteLine($"Enter integer #{i + 1} (between -10,000 and 10,000):");

                    string inputTest = Console.ReadLine();
                    if (int.TryParse(inputTest, out int number))
                    {
                        if (number >= -10000 && number <= 10000)
                        {
                            ints[i] = number;
                            validInput = true;
                        }
                        else
                        {
                            Console.WriteLine("Please enter a number between -10,000 and 10,000.");
                        }
                    }
                    else
                    {
                        Console.WriteLine("Invalid input. Please enter a valid integer.");
                    }
                }
            }

            Console.WriteLine($"Entered array:");
            foreach (int i in ints)
            {
                Console.Write($"{i} ");
            }

            Array.Reverse( ints );
            Console.WriteLine();
            Console.WriteLine("Reversed array:");
            foreach (int i in ints)
            {
                Console.Write($"{i} ");
            }

            double sum = 0;
            for (int i = 0; i < ints.Length; i++)
            {
                sum = sum + ints[i];
            }
            double average = sum / ints.Length;

            Console.WriteLine();
            Console.WriteLine($"Average of the array elements is: {average.ToString("F")}"); //format to round to hundredth place

            double variance = 0;
            for (int i = 0; i < ints.Length; i++)
            {
                variance = variance + ((ints[i] - average) * (ints[i] - average));
            }
            variance = variance / ints.Length;
            double standardDeviation = Math.Sqrt(variance);

            Console.WriteLine($"The Standard Deviation of the array elements is: {standardDeviation.ToString("F")}"); //format to round to hundredth place

            Array.Sort(ints);
            double median = 0;
            if (ints.Length % 2 == 0) //even num of elements
            {
                median = (((ints[ints.Length / 2]) + (ints[(ints.Length / 2) - 1])) /2.0);
            }
            else //odd num of elements
            {
                for (int i = 0; i < ints.Length; i++)
                {
                    if ((i + 1) == (ints.Length) - i)
                    {
                        median = ints[i]; 
                    }
                }
            }
            Console.WriteLine($"The Median of the array elements is: {median.ToString("F")}");

            //if all numbers occur only once, mode = lowest num

            int mode = ints[0];
            int count = 0;
            
            for (int i = 0; i < ints.Length; i++)
            {
                int counter = 0;

                for (int j = 0; j < ints.Length; j++)
                {
                    if (ints[i] == ints[j])
                    {
                        counter++;
                    }
                }

                if (counter > count)
                {
                    count = counter;
                    mode = ints[i];
                }
               
            }
            if (count > 1)
            {
                Console.WriteLine($"The Mode of the array elements is: {mode.ToString("F")}");
            }
            else //mode = lowest value element or the 0th index after array.sort
            {
                Console.WriteLine($"The Mode of the array elements is: {ints[0].ToString("F")}");
            }
            

            
        }

        


        static void Main(string[] args)
        {
            Console.WriteLine("Enter the number of elements you wish to add to the array (between 1 and 30):");
            int input = int.Parse(Console.ReadLine());

            ManipulateArrayElements(input);

        }
    }
}
