package com.project.passwordRegister.infra.PasswordStrengthChecker;

public class NumbersBonus implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        int count = password.replaceAll("[^0-9]", "").length();
        return count * 4;
    }
}