import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;

public class Quiz_Application {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Welcome to the Quiz");
        System.out.println("Select 'Y' or 'N'.");
        char yesNo = sc.next().charAt(0); // read first character of the input
        int marks = 0;
        List<Boolean> results = new ArrayList<>();

        if (yesNo == 'y' || yesNo == 'Y') {
            for (int i = 1; i <= 10; i++) {
                boolean isCorrect = askQuestion(i, sc, 30000);
                results.add(isCorrect);
                if (isCorrect) {
                    marks++;
                }
            }
            System.out.println("You scored " + marks + " marks in the quiz.");
            displayResults(results);
        } else {
            System.out.println("You quit the quiz.");
        }
        sc.close();
    }

    public static boolean askQuestion(int questionNumber, Scanner sc, int timeLimit) {
        String question = "";
        String[] options = new String[4];
        int correctAnswer = 0;

        // Sample questions and answers
        switch (questionNumber) {
            case 1:
                question = "Q1. What is the correct syntax for the main method in JAVA?";
                options[0] = "1. public static main(String [] args)";
                options[1] = "2. public void main(String[] args)";
                options[2] = "3. public static void main(String[] args)";
                options[3] = "4. main(String[] args)";
                correctAnswer = 3;
                break;
            case 2:
                question = "Q2. Which of the following is not a primitive data type in Java?";
                options[0] = "1. int";
                options[1] = "2. boolean";
                options[2] = "3. String";
                options[3] = "4. char";
                correctAnswer = 3;
                break;
            case 3:
                question = "Q3. How do you create a single-line comment in Java?";
                options[0] = "1. //This is a comment";
                options[1] = "2. /* this is a comment */";
                options[2] = "3. <--this is a comment -->";
                options[3] = "4. # this is a comment";
                correctAnswer = 1;
                break;
            case 4:
                question = "Q4. What is the output of the following code System.out.println(5 + 3 * 2)?";
                options[0] = "1. 11";
                options[1] = "2. 16";
                options[2] = "3. 13";
                options[3] = "4. 10";
                correctAnswer = 1;
                break;
            case 5:
                question = "Q5. What is the method used to find the length of a string in Java?";
                options[0] = "1. length()";
                options[1] = "2. size()";
                options[2] = "3. getLength()";
                options[3] = "4. count()";
                correctAnswer = 1;
                break;
            case 6:
                question = "Q6. How do you declare an array of integers in Java?";
                options[0] = "1. int array[] = new int[10]";
                options[1] = "2. int[] array = new int[10]";
                options[2] = "3. array int[] = new int[10]";
                options[3] = "4. int array = new int[10]";
                correctAnswer = 2;
                break;
            case 7:
                question = "Q7. Which keyword is used to inherit a class in Java?";
                options[0] = "1. implement";
                options[1] = "2. extends";
                options[2] = "3. inherits";
                options[3] = "4. implements";
                correctAnswer = 2;
                break;
            case 8:
                question = "Q8. What is the default value of a boolean variable in Java?";
                options[0] = "1. true";
                options[1] = "2. false";
                options[2] = "3. 0";
                options[3] = "4. null";
                correctAnswer = 2;
                break;
            case 9:
                question = "Q9. What is the correct way to create an object of the class Car in Java?";
                options[0] = "1. Car carObject = new Car()";
                options[1] = "2. Car carObject = Car()";
                options[2] = "3. new Car carobject = Car()";
                options[3] = "4. Car carObject = Car.new()";
                correctAnswer = 1;
                break;
            case 10:
                question = "Q10. Which of the following loops in Java is guaranteed to execute at least once?";
                options[0] = "1. for";
                options[1] = "2. while";
                options[2] = "3. do-while";
                options[3] = "4. foreach";
                correctAnswer = 3;
                break;
        }

        System.out.println(question);
        for (String option : options) {
            System.out.println(option);
        }

        final boolean[] answered = {false};
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            public void run() {
                if (!answered[0]) {
                    System.out.println("Time's up! Skipping question...");
                }
                timer.cancel();
            }
        }, timeLimit);

        int answer = 0;
        try {
            System.out.print("Enter your answer (within " + (timeLimit / 1000) + " seconds): ");
            answer = sc.nextInt();
            answered[0] = true;
        } catch (Exception e) {
            System.out.println("Invalid input. Skipping question...");
            sc.next(); // Clear the invalid input
        }
        timer.cancel();

        return answered[0] && answer == correctAnswer;
    }

    public static void displayResults(List<Boolean> results) {
        System.out.println("Summary of your answers:");
        for (int i = 0; i < results.size(); i++) {
            if (results.get(i)) {
                System.out.println("Question " + (i + 1) + ": Correct");
            } else {
                System.out.println("Question " + (i + 1) + ": Incorrect");
            }
        }
    }
}
