package com.project.passwordRegister.infra.PasswordStrengthChecker;

public class SymbolsBonus implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        int count = password.replaceAll("[\\w]", "").length();
        return count * 6;
    }
}