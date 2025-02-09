package com.project.passwordRegister.infra.PasswordStrengthChecker;

import java.util.HashMap;
import java.util.Map;

public class RepeatedCharactersDeduction implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        if (password == null || password.isEmpty()) {
            return 0;
        }

        String passwordLower = password.toLowerCase();
        Map<Character, Integer> charCount = new HashMap<>();

        for (char c : passwordLower.toCharArray()) {
            charCount.put(c, charCount.getOrDefault(c, 0) + 1);
        }

        int deduction = 0;

        for (int count : charCount.values()) {
            if (count > 1) {
                deduction -= (count - 1);
            }
        }

        if (meetsMinimumRequirements(password) && deduction != 0) {
            deduction -= 1;
        }

        if (!meetsMinimumRequirements(password) && deduction != 0) {
            deduction += 1;
        }

        return deduction;
    }


    private boolean meetsMinimumRequirements(String password) {
        if (password.length() < 8) {
            return false;
        }

        int requirementsMet = 0;
        boolean hasUppercase = password.matches(".*[A-Z].*");
        boolean hasLowercase = password.matches(".*[a-z].*");
        boolean hasNumber = password.matches(".*\\d.*");
        boolean hasSymbol = password.matches(".*[^A-Za-z0-9].*");

        if (hasUppercase) requirementsMet++;
        if (hasLowercase) requirementsMet++;
        if (hasNumber) requirementsMet++;
        if (hasSymbol) requirementsMet++;

        return requirementsMet >= 3;
    }
}
