import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ATM_interface implements ActionListener {

    // Declare buttons as class variables to access them in the actionPerformed method
    private JButton cashWithdrawalButton;
    private JButton fastCashButton;
    private JButton balanceEnquiryButton;
    private JButton depositAmountButton;
    private JButton exitButton;
    private JButton loginButton;
    private JFrame jframe;
    private JPanel loginPanel;
    private JPanel dashboardPanel;
    private JTextField usernameTextField;
    private JPasswordField passwordTextField;

    // Assume initial balance is 10000 for demonstration purposes
    private double balance = 10000.0;
    private final String username = "admin";
    private final String password = "secret";

    // Constructor to set up the GUI
    public ATM_interface() {
        jframe = new JFrame("ATM Machine");

        // Create panels
        loginPanel = createLoginPanel();
        dashboardPanel = createDashboardPanel();

        // Set layout for the frame
        jframe.setLayout(new CardLayout());

        // Add panels to the frame
        jframe.add(loginPanel, "loginPanel");
        jframe.add(dashboardPanel, "dashboardPanel");

        // Frame setup
        jframe.setBounds(500, 200, 500, 500); // Set frame size and location
        jframe.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        jframe.setVisible(true);
    }

    // Method to create the login panel
    private JPanel createLoginPanel() {
        JPanel panel = new JPanel(null);
        JLabel titleLabel = new JLabel("Bank Management System", SwingConstants.CENTER);
        titleLabel.setBounds(100, 50, 300, 30);
        panel.add(titleLabel);

        JLabel usernameLabel = new JLabel("Username");
        JLabel passwordLabel = new JLabel("Password");
        usernameLabel.setBounds(35, 100, 100, 30);
        passwordLabel.setBounds(35, 150, 100, 30);
        panel.add(usernameLabel);
        panel.add(passwordLabel);

        usernameTextField = new JTextField();
        usernameTextField.setBounds(130, 100, 200, 30);
        passwordTextField = new JPasswordField();
        passwordTextField.setBounds(130, 150, 200, 30);
        panel.add(usernameTextField);
        panel.add(passwordTextField);

        loginButton = new JButton("Login");
        loginButton.setBounds(150, 200, 100, 30);
        loginButton.addActionListener(this);
        panel.add(loginButton);

        return panel;
    }

    // Method to create the dashboard panel
    private JPanel createDashboardPanel() {
        JPanel panel = new JPanel(null);

        cashWithdrawalButton = new JButton("CASH WITHDRAWAL");
        cashWithdrawalButton.setBounds(20, 60, 150, 40);
        cashWithdrawalButton.addActionListener(this);

        fastCashButton = new JButton("FAST CASH");
        fastCashButton.setBounds(20, 150, 150, 40);
        fastCashButton.addActionListener(this);

        balanceEnquiryButton = new JButton("BALANCE ENQUIRY");
        balanceEnquiryButton.setBounds(260, 60, 150, 40);
        balanceEnquiryButton.addActionListener(this);

        depositAmountButton = new JButton("DEPOSIT AMOUNT");
        depositAmountButton.setBounds(260, 150, 150, 40);
        depositAmountButton.addActionListener(this);

        exitButton = new JButton("EXIT");
        exitButton.setBounds(140, 240, 140, 40);
        exitButton.addActionListener(this);

        panel.add(cashWithdrawalButton);
        panel.add(fastCashButton);
        panel.add(balanceEnquiryButton);
        panel.add(depositAmountButton);
        panel.add(exitButton);

        return panel;
    }

    // Action listener to handle button clicks
    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == loginButton) {
            String enteredUsername = usernameTextField.getText();
            String enteredPassword = new String(passwordTextField.getPassword());

            // Check if username and password are correct
            if (enteredUsername.equals(username) && enteredPassword.equals(password)) {
                CardLayout cl = (CardLayout) (jframe.getContentPane().getLayout());
                cl.show(jframe.getContentPane(), "dashboardPanel");
            } else {
                JOptionPane.showMessageDialog(jframe, "Invalid username or password!");
            }
        } else if (e.getSource() == cashWithdrawalButton) {
            performCashWithdrawal();
        } else if (e.getSource() == fastCashButton) {
            performFastCash();
        } else if (e.getSource() == balanceEnquiryButton) {
            showBalanceEnquiry();
        } else if (e.getSource() == depositAmountButton) {
            performDepositAmount();
        } else if (e.getSource() == exitButton) {
            int confirm = JOptionPane.showConfirmDialog(null, "Are you sure you want to exit?", "Exit Confirmation", JOptionPane.YES_NO_OPTION);
            if (confirm == JOptionPane.YES_OPTION) {
                System.exit(0);
            }
        }
    }

    // Method to handle cash withdrawal
    private void performCashWithdrawal() {
        String amountStr = JOptionPane.showInputDialog(jframe, "Enter amount to withdraw:");
        if (amountStr != null) {
            try {
                double amount = Double.parseDouble(amountStr);
                if (amount <= balance) {
                    balance -= amount;
                    JOptionPane.showMessageDialog(jframe, "Withdrawal successful! New balance: $" + balance);
                } else {
                    JOptionPane.showMessageDialog(jframe, "Insufficient balance!");
                }
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(jframe, "Invalid amount entered!");
            }
        }
    }

    // Method to handle fast cash withdrawal
    private void performFastCash() {
        String[] options = {"100", "200", "500", "2000"};
        String amountStr = (String) JOptionPane.showInputDialog(jframe, "Select amount to withdraw:", "Fast Cash", JOptionPane.PLAIN_MESSAGE, null, options, options[0]);
        if (amountStr != null) {
            double amount = Double.parseDouble(amountStr);
            if (amount <= balance) {
                balance -= amount;
                JOptionPane.showMessageDialog(jframe, "Withdrawal successful! New balance: $" + balance);
            } else {
                JOptionPane.showMessageDialog(jframe, "Insufficient balance!");
            }
        }
    }

    // Method to show balance enquiry
    private void showBalanceEnquiry() {
        JOptionPane.showMessageDialog(jframe, "Your current balance is: $" + balance);
    }

    // Method to handle deposit amount
    private void performDepositAmount() {
        String amountStr = JOptionPane.showInputDialog(jframe, "Enter amount to deposit:");
        if (amountStr != null) {
            try {
                double amount = Double.parseDouble(amountStr);
                balance += amount;
                JOptionPane.showMessageDialog(jframe, "Deposit successful! New balance: $" + balance);
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(jframe, "Invalid amount entered!");
            }
        }
    }

    // Main method to start the application
    public static void main(String[] args) {
        new ATM_interface();
    }
}
