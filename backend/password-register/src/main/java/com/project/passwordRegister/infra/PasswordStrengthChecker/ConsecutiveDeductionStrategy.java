package com.project.passwordRegister.infra.PasswordStrengthChecker;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ConsecutiveDeductionStrategy implements PasswordStrengthCalculator {
    private final String regex;
    private final int multiplier;

    public ConsecutiveDeductionStrategy(String regex, int multiplier) {
        this.regex = regex;
        this.multiplier = multiplier;
    }

    @Override
    public int calculate(String password) {
        int deduction = 0;
        Matcher matcher = Pattern.compile(regex).matcher(password);

        while (matcher.find()) {
            int length = matcher.group().length();

            if (length >= 2) {
                deduction -= (length - 1) * multiplier;
            }
        }

        return deduction;
    }
}
