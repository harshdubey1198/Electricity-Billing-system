import java.util.Random;
import java.util.Scanner;

public class NumberGame {
    public static void main(String[] args) {
        Random rand = new Random();
        Scanner sc = new Scanner(System.in);

        System.out.println("Welcome to the guess number game");

        while (true) {
            for (int round = 1; round <= 2; round++) {
                int generatedNo = rand.nextInt(100) + 1;
                int attempt = 0;

                System.out.println("Round " + round + ":");

                while (true) {
                    System.out.print("Guess a number between 1 and 100: ");

                    if (!sc.hasNextInt()) {
                        System.out.println("Invalid input, please enter an integer.");
                        sc.next(); // Consume invalid input
                        continue;
                    }

                    int guess = sc.nextInt();
                    attempt++;

                    if (guess < 1 || guess > 100) {
                        System.out.println("invalid input, Enter a number between 1 and 100.");
                        continue;
                    }

                    if (generatedNo < guess) {
                        System.out.println("This is too high.");
                    } else if (generatedNo > guess) {
                        System.out.println("This is too low.");
                    } else {
                        System.out.println("You win! The correct number was: " + generatedNo);
                        System.out.println("In " + attempt + " attempt(s).");
                        break;
                    }

                    if (attempt >= 10) {
                        System.out.println("Maximum attempts reached. Game over.");
                        break;
                    }
                }

                if (round < 2) {
                    System.out.println("Get ready for the next round!");
                }
            }

            System.out.print("Do you want to play again? (yes/no): ");
            sc.nextLine(); // Consume newline
            String response = sc.nextLine().trim().toLowerCase();
            if (!response.equals("yes")) {
                System.out.println("Thank you for playing.");
                break;
            }
        }
    }
}
