package com.project.passwordRegister.infra.PasswordStrengthChecker;

public class OnlyLettersDeduction implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        if (password.matches("[a-zA-Z]+")) {
            return -password.length();
        }
        return 0;
    }
}
