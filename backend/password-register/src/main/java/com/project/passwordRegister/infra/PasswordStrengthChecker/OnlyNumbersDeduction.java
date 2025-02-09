package com.project.passwordRegister.infra.PasswordStrengthChecker;

public class OnlyNumbersDeduction implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        if (password.matches("[0-9]+")) {
            return -password.length();
        }
        return 0;
    }
}
