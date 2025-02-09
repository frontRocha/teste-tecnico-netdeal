package com.project.passwordRegister.infra.PasswordStrengthChecker;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SequentialDeductionStrategy implements PasswordStrengthCalculator {
    private final String regex;
    private final int sequenceLength;
    private final int multiplier;

    public SequentialDeductionStrategy(String regex, int sequenceLength, int multiplier) {
        this.regex = regex;
        this.sequenceLength = sequenceLength;
        this.multiplier = multiplier;
    }

    @Override
    public int calculate(String password) {
        int deduction = 0;

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);

        while (matcher.find()) {
            int sequenceCount = matcher.group(0).length();

            if (sequenceCount >= sequenceLength) {
                deduction += 0;
            }
        }

        return deduction;
    }
}
