package com.project.passwordRegister.infra.PasswordStrengthChecker;

public class UppercaseLetterBonus implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        int uppercaseCount = password.replaceAll("[^A-Z]", "").length();
        int totalLength = password.length();

        if (uppercaseCount == totalLength || uppercaseCount == 0) {
            return 0;
        }

        int score = Math.max(0, (Math.abs(uppercaseCount - totalLength) * 2));
        return score;
    }
}
