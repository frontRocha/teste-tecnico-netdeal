package com.project.passwordRegister.infra.PasswordStrengthChecker;

public class MiddleNumbersOrSymbolsBonus implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        if (password.length() < 3) {
            return 0;
        }
        String middle = password.substring(1, password.length() - 1);
        int count = middle.replaceAll("[a-zA-Z]", "").length();

        return count * 2;
    }
}