using System.Xml.Linq;
using System;
using System.Text;


namespace Dungeon_Crawler_Character_Management
{
    class Character
    {
        public string Name { get; set; }//null default
        public string Class { get; set; }//null default
        public int Level { get; set; }
        public int HitPoints { get; set; }
        public int AvailableAttributePoints { get; set; }
        public List<Skill> Skills { get; set; } = new List<Skill>();  //initialize the list, cannot have null as default value, needed for AssignSkillsToCharacter function


        public void AddSkills (Skill skill)
        {
            Skills.Add (skill);
        }


        public string DisplaySkills ()//return value will be string, just for ToString method within the class
        {

            if (Skills != null && Skills.Count > 0)
            {
                var skillList = new StringBuilder ();//more efficient than cocatenating strings in the loop, does not create multiple strings
                foreach (Skill skill in Skills)
                {
                    skillList.AppendLine(skill.ToString());
                }
                return skillList.ToString();
            }
            else
            {
                return $"There are no skills assigned yet...!";
            }


        }
        public override string ToString()
        {
            return  $"Name: {Name}\n" +
                    $"Class: {Class}\n" +
                    $"Level: {Level}\n" +
                    $"Hit Points: {HitPoints}\n" +
                    $"Available Attribute Points: {AvailableAttributePoints}\n" +
                    $"Skills:\n" + DisplaySkills();//function call for skills display
                    
        }
    }
    class Skill
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Attribute { get; set; }
        public int RequiredAttributePoints { get; set; }

        public override string ToString()
        {
            return $"{Name} - {Description} - {Attribute} - Point Requirement: {RequiredAttributePoints}.";
        }
    }
    internal class Program
    {
        static void DisplayMenu() 
        {
            Console.WriteLine("Main Menu:");
            Console.WriteLine(
                "1. Create a Character\n" +
                "2. Assign skills\n" +
                "3. Level up a character\n" +
                "4. Display all characters\n" +
                "5. Exit");
            Console.Write("Enter your choice: ");
        }

        static Character CreateCharacter ()
        {
            Console.WriteLine();
            Console.Write("Enter Name: ");
            string name = Console.ReadLine();
            Console.Write("Enter Class: ");
            string characterClass = Console.ReadLine();
            Console.Write("Enter Total Attribute Points: ");
            int ap = int.Parse(Console.ReadLine());

            Character character = new Character
            {
                Name = name,
                Class = characterClass,
                Level = 1,
                AvailableAttributePoints = ap,
                HitPoints = (10 + ap) / 2
            };

            Console.WriteLine($"Character {name} created!");
            Console.WriteLine();
            return character;
        }

        static void DisplayAllCharacters (List<Character> characters)
        {
            if (!(characters.Count == 0))
            {
                Console.WriteLine();
                Console.WriteLine("===========================================");
                Console.WriteLine("      All Characters in the System");
                Console.WriteLine("===========================================");
                for (int i = 0; i < characters.Count; i++)
                {
                    Console.WriteLine(characters[i]);
                    Console.WriteLine();
                }
                Console.WriteLine("===========================================");
                Console.WriteLine("                  End");
                Console.WriteLine("===========================================");
                Console.WriteLine();
            }
            else
            {
                Console.WriteLine();
                Console.WriteLine("===========================================");
                Console.WriteLine("      All Characters in the System");
                Console.WriteLine("===========================================");
                Console.WriteLine();
                Console.WriteLine("There are no Characters in the system.");
                Console.WriteLine();
                Console.WriteLine("===========================================");
                Console.WriteLine("                  End");
                Console.WriteLine("===========================================");
                Console.WriteLine();
            }
        }

        static void DisplaySkills (List<Skill> skills)
        {
            Console.WriteLine("-------Available Skills:-------");
            Console.WriteLine();
            for (int i = 0; i < skills.Count; i++)
            {
                Console.WriteLine(skills[i]);
            }
            Console.WriteLine();
            Console.WriteLine("-------End of Skill list-------");
            Console.WriteLine();
        }

        static void AssignSkillsToCharacter(List<Character> characters, List<Skill> skills)
        {
            Console.WriteLine();
            Console.WriteLine("Choose a character to assign skills to (Enter the name as the choice): ");
            foreach (Character character in characters)
            {
                Console.WriteLine($"[{character.Name}, Available Attribute Points: {character.AvailableAttributePoints}]");
            }

            string characterChoice = Console.ReadLine();
            Character chosenChar = characters.Find(c => c.Name.Equals(characterChoice, StringComparison.OrdinalIgnoreCase));

            if (chosenChar != null)
            {
                Console.WriteLine();
                Console.WriteLine("Choose a skill to assign (Enter the skill name): ");
                DisplaySkills(skills);  // Display available skills
                string skillChoice = Console.ReadLine();

                Skill chosenSkill = skills.Find(s => s.Name.Equals(skillChoice, StringComparison.OrdinalIgnoreCase));

                if (chosenSkill != null)
                {
                    if (chosenChar.AvailableAttributePoints >= chosenSkill.RequiredAttributePoints)
                    {
                        chosenChar.Skills.Add(chosenSkill);
                        chosenChar.AvailableAttributePoints -= chosenSkill.RequiredAttributePoints;  // Deduct points
                        skills.Remove(chosenSkill);  // Remove skill from available list
                        Console.WriteLine($"{skillChoice} added to {characterChoice}!");
                    }
                    else
                    {
                        Console.WriteLine($"{characterChoice} does not have enough attribute points to learn {skillChoice}.");
                    }
                }
                else
                {
                    Console.WriteLine("The skill inputted is not found on the skill list.");
                }
            }
            else
            {
                Console.WriteLine("The character inputted is not found in the character list.");
            }

            Console.WriteLine();
        }


        static void LevelUpCharacter (List<Character> characters)
        {
            Console.WriteLine("Choose from the character list(Enter the name as the choice): ");
            foreach (Character character in characters)
            {
                Console.Write('[' + character.Name + "] ");
            }

            string charName = Console.ReadLine();
            bool charFound = false;
 
            foreach (Character character in characters)
            {
                if (character.Name.ToLower() == charName)
                {
                    character.Level += 1;
                    character.HitPoints += 5;
                    character.AvailableAttributePoints += 10;
                    charFound = true;

                    Console.WriteLine($"{charName} level increased by 1!" + $"\n{charName} is now a Level:{character.Level} Character.");
                }
                
            }
            if (!charFound)
            {
                Console.WriteLine($"The inputted character name:{charName} does not exist in the character list.");
            }

            Console.WriteLine();
        }
        static void Main(string[] args)
        {

            List<Character> characters = new List<Character>();
            List<Skill> skills = new List<Skill>
            {
                new Skill { Name = "Strike", Description = "A powerful strike.", Attribute = "Strength", RequiredAttributePoints=10 },
                new Skill { Name = "Dodge", Description = "Avoid an attack.", Attribute = "Dexterity", RequiredAttributePoints=15 },
                new Skill { Name = "Spellcast", Description = "Cast a spell.", Attribute = "Intelligence", RequiredAttributePoints=20 },
                new Skill { Name = "Steal", Description = "Stealthly take another's belonging.", Attribute = "Luck", RequiredAttributePoints=60 },
                new Skill { Name = "Block", Description = "Block an attack", Attribute = "Strength", RequiredAttributePoints=30 },
                new Skill { Name = "Teleport", Description = "Blink to a set location.", Attribute = "Intelligence", RequiredAttributePoints=45 },
                new Skill { Name = "Mark", Description = "Focus targets on a specific enemy.", Attribute = "Luck", RequiredAttributePoints=5 },
                new Skill { Name = "Backflip", Description = "Jump a distance backwards with dexterity.", Attribute = "Dexterity", RequiredAttributePoints=50 }
            };

            Dictionary<int, Action> menuActions = new Dictionary<int, Action>
            {
                { 1, () => characters.Add(CreateCharacter()) },
                { 2, () => AssignSkillsToCharacter(characters, skills) },
                { 3, () => LevelUpCharacter(characters) },
                { 4, () => DisplayAllCharacters(characters) },
                { 5, () => Console.WriteLine("Exiting the management.") }
            };

            int choice;

            do
            {
                DisplayMenu();
                choice = int.Parse(Console.ReadLine());

                if (menuActions.ContainsKey(choice))
                {
                    menuActions[choice]();
                }
                else
                {
                    Console.WriteLine("Please enter a valid option between 1 and 5.");
                }
            }
            while (choice == 1 || choice == 2 || choice == 3 || choice == 4);

        }
    }
}
