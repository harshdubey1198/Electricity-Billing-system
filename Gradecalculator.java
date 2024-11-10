import java.util.Scanner;

        public class Gradecalculator {


            public static void main(String[] args) {
                int marks;
                Scanner sc = new Scanner(System.in);
                System.out.println("Marks of Physics");


                int P = sc.nextInt();
                if (P >= 75 && P <= 100) {
                    System.out.println("A Grade");
                } else if (P >= 60 && P < 75) {
                    System.out.println("B Grade");
                } else if (P >= 45 && P < 60) {
                    System.out.println("C Grade");
                } else if (P <= 45 && P > 33) {
                    System.out.println("D Grade");
                } else if (P < 33) {
                    System.out.println("fail");
                }
                System.out.println("marks of Mathematics");
                int M = sc.nextInt();

                if (M >= 75 && M < 100) {
                    System.out.println("A Grade");
                } else if (M > 60 && M < 75) {
                    System.out.println("B Grade");
                } else if (M >= 45 && M < 60) {
                    System.out.println("C Grade");
                } else if (M < 45 && M > 33) {
                    System.out.println("D Grade");
                } else if (M < 33) {
                    System.out.println("fail");
                }
                System.out.println("marks of Chemistry");
                int C = sc.nextInt();

                if (C > 75 && C <= 100) {
                    System.out.println("A Grade");
                } else if (C >= 60 && C < 75) {
                    System.out.println("B Grade");
                } else if (C >= 45 && C < 60) {
                    System.out.println("C Grade");
                } else if (C <= 45 && C > 33) {
                    System.out.println("D Grade");
                } else if (C < 33) {
                    System.out.println("fail");
                }
                int Sum = P + C + M;
                System.out.println("Total Marks out of 300 :" +Sum);

                System.out.println("Average percentage: " + Sum / 3);




            }
        }