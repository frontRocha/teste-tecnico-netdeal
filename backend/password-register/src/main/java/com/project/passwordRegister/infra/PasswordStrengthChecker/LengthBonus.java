package com.project.passwordRegister.infra.PasswordStrengthChecker;

public class LengthBonus implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        return password.length() * 4;
    }
}
