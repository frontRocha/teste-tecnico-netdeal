package com.project.passwordRegister.infra.PasswordStrengthChecker;

public class RequirementsBonus implements PasswordStrengthCalculator {
    @Override
    public int calculate(String password) {
        int requirementsMet = 0;

        if (password.matches(".*[A-Z].*")) requirementsMet++;

        if (password.matches(".*[a-z].*")) requirementsMet++;

        if (password.matches(".*[0-9].*")) requirementsMet++;

        if (password.matches(".*[^\\w].*")) requirementsMet++;

        if (requirementsMet >= 3 && password.length() >= 8) {
            return (requirementsMet + 1) * 2;
        } else {
            return 0;
        }
    }
}
