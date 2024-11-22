using System.Diagnostics.Metrics;

namespace StringTextData
{
    internal class Program
    {
        /* not needed to meet the outcome
         
        //true if non-letter
        static bool CheckForNonLetter(char c)
        {
            return !char.IsLetter(c);
        }
          
        static string CheckFirstAndLastLetter (string input)
        {
            var split = GetWords(input); //remove extra spaces, turn the string into an array of string elements

            for (int i = 0; i < split.Length; i++) //for every string element 'i' in the string array "split":
            {
                string word = split[i]; //assign it to a string variable: word

                if (CheckForNonLetter(word[0]) || CheckForNonLetter(word[word.Length - 1]) || (CheckForNonLetter(word[0]) && CheckForNonLetter(word[word.Length - 1]))) //if the start or the end OR both are non-letters:
                {
                    return word; //do nothing
                }
                else
                {
                    char[] chars = word.ToCharArray(); //turn the string elements to an array of char called "chars"

                    for (int j = 0; j < chars.Length; j++)  //for every char element 'j' in the char array "chars":
                    {
                        if (CheckForNonLetter(chars[j])) //if any of the char is a non-letter:
                        {
                            chars[j] = ' '; //replace the non-letter with a ' '
                        }
                        word = new string(chars); //assign the new char array "chars" into a string
                    }
                    return word;
                }

                                
            }
            
        }

        string[] split = GetWords(input);
            string[] uniqueWords = new string[split.Length];
            int[] counterArr = new int[split.Length];
            int counter = 0;

            foreach (var word in split) 
            {
                int index = Array.IndexOf(uniqueWords, word, 0, counter);

                if (index >= 0)
                {
                    counterArr[index]++;
                }
                else 
                {
                    while (counter < uniqueWords.Length) 
                    {
                        uniqueWords[counter] = word;
                        counterArr[counter] = 1;
                        counter++;
                    }
                }
            }
            for (int i = 0; i < counter; i++) {
                Console.WriteLine($"{uniqueWords[i]}      {counterArr[i]}");
            }



        */

        static string[] GetWords (string input)
        {
            //if there are chained spaces, making sure they are not counted toward the word count
            
            while (input.Contains("  ") || input.Contains(".") || input.Contains(",") || input.Contains(":") || input.Contains(";") || input.Contains("/"))
            {
                input = input.Replace("  ", " ");
                input = input.Replace(".", " ");
                input = input.Replace(",", " ");
                input = input.Replace(":", " ");
                input = input.Replace(";", " ");
                input = input.Replace("/", " ");
            }
            input = input.Trim();

            return input.Split(' ', '.', ':', ';', '/', ',');
        }

        static void GetNumOfWords (string input)
        {
            var split = GetWords(input);
            Console.WriteLine($"Word Count: {split.Length}");
        }

        static void GetNumOfVowels(string input) 
        {
            int vowelCounter = 0;
            input = input.ToLower(); //lowercase and uppercase are treated equally in this case, as we only care about the count.

            foreach (char c in input)
            {
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u')
                {
                    vowelCounter++;
                }
            }
            Console.WriteLine($"Vowel Count: {vowelCounter}");
        }

        // need to sort alphabetically as well vertically
        static void GetWordFrequencyCount(string input)
        {
            string[] words = GetWords(input); //format input string into words

            //test
            //foreach (string word in words)
            //{
            //    Console.WriteLine(word);
            //}

            string[] uniqueWords = new string[words.Length]; //create array to store unique words
            bool[] counted = new bool[words.Length]; //array to check for duplicates
            int[] wordCount = new int[words.Length]; //array to store word count

            int uniqueWordCount = 0;
            for (int i = 0; i < words.Length; i++)
            {
                if (counted[i]) continue;

                int count = 1;
                uniqueWords[uniqueWordCount] = words[i]; //store unique word

                for (int j = 0; j < words.Length; j++)
                {
                    if (words[i] == words[j] && i != j) //this is is a test a this a a
                    {
                        counted[j] = true;
                        count++;
                    }
                    
                }
                wordCount[uniqueWordCount] = count;
                uniqueWordCount++;
            }

            Array.Resize(ref uniqueWords, uniqueWordCount);
            Array.Resize(ref wordCount, uniqueWordCount);

            string[] finalArray = new string[uniqueWordCount];

            for (int i = 0; i < finalArray.Length; i++)
            {
                finalArray[i] = $"{uniqueWords[i],12}{wordCount[i],5}";
            }

            //Array.Sort(finalArray);
            //finalArray = finalArray.OrderBy();

            Array.Sort(finalArray, (x, y) => string.Compare(x.Trim().Split(' ')[0], y.Trim().Split(' ')[0])); //order alphabetically


            Console.WriteLine("Word Frequency Count:");
            Console.WriteLine("      WordFrequency");
            foreach (string word in finalArray)
            {
                Console.WriteLine(word);
            }
        }
        static void Main(string[] args)
        {
            Console.WriteLine("Enter a paragraph of text:");
            var input = Console.ReadLine();

            GetNumOfWords(input);
            GetNumOfVowels(input);
            GetWordFrequencyCount(input);

        }

    }
}
//Alex is a good student. Programming is fun for Alex. David, Susan, and Alex are good at C# programming. Alex is ambitious to create his/her career in Software Development.
//Albert Einstein was born at Ulm, in Württemberg, Germany, on March 14, 1879. Six weeks later the family moved to Munich, where he later on began his schooling at the Luitpold Gymnasium.


