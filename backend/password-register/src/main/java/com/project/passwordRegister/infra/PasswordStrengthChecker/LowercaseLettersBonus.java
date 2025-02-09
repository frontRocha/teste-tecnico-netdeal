package com.project.passwordRegister.infra.PasswordStrengthChecker;

public class LowercaseLettersBonus implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        int lowercaseCount = password.replaceAll("[^a-z]", "").length();
        int totalLength = password.length();

        if (lowercaseCount == totalLength) {
            return 0;
        }

        int count = Math.max(0, (Math.abs(lowercaseCount - totalLength) * 2));

        return count;
    }
}
