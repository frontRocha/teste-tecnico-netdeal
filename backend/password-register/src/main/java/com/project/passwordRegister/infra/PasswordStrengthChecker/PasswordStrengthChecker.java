package com.project.passwordRegister.infra.PasswordStrengthChecker;

import com.project.passwordRegister.domain.Employee.PasswordStatus;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PasswordStrengthChecker {
    private final List<PasswordStrengthCalculator> strategies;

    public PasswordStrengthChecker() {
        strategies = new ArrayList<>();
        strategies.add(new LengthBonus());
        strategies.add(new LowercaseLettersBonus());
        strategies.add(new MiddleNumbersOrSymbolsBonus());
        strategies.add(new NumbersBonus());
        strategies.add(new RequirementsBonus());
        strategies.add(new SymbolsBonus());
        strategies.add(new UppercaseLetterBonus());
        strategies.add(new OnlyLettersDeduction());
        strategies.add(new OnlyNumbersDeduction());
        strategies.add(new RepeatedCharactersDeduction());

        strategies.add(new ConsecutiveDeductionStrategy("[A-Z]{2,}", 2)); // Letras maiúsculas consecutivas
        strategies.add(new ConsecutiveDeductionStrategy("[a-z]{2,}", 2)); // Letras minúsculas consecutivas
        strategies.add(new ConsecutiveDeductionStrategy("[0-9]{2,}", 2)); // Números consecutivos

        strategies.add(new SequentialDeductionStrategy("[a-zA-Z]", 3, 3));
        strategies.add(new SequentialDeductionStrategy("[0-9]", 3, 3));
        strategies.add(new SequentialDeductionStrategy("[!@#$%^&*()-+=]", 3, 3));
    }

    public int calculatePasswordStrength(String password) {
        int totalStrength = 0;
        int maxStrength = 100;

        for (PasswordStrengthCalculator strategy : strategies) {
            totalStrength += strategy.calculate(password);
        }

        return Math.max(0, Math.min(totalStrength, maxStrength));
    }

    public PasswordStatus classifyPassword(int score) {
        if (score >= 95) {
            return PasswordStatus.STRONG;
        }
        if (score >= 60) {
            return PasswordStatus.GOOD;
        }
        if (score >= 20) {
            return PasswordStatus.AVERAGE;
        }

        return PasswordStatus.BAD;
    }
}
