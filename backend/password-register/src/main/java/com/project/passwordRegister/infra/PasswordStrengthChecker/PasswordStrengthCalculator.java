package com.project.passwordRegister.infra.PasswordStrengthChecker;

public interface PasswordStrengthCalculator {
    int calculate(String password);
}