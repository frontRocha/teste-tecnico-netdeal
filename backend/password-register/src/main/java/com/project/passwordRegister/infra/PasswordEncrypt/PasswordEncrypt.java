package com.project.passwordRegister.infra.PasswordEncrypt;

import com.project.passwordRegister.domain.Employee.EmployeeDTO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordEncrypt {
    public String encryptPassword(EmployeeDTO employeeDTO) {
        String encryptedPassword = new BCryptPasswordEncoder().encode(employeeDTO.getPassword());
        return encryptedPassword;
    }

    // pode ser utilizado para editar a senha, comparando se o valor será o mesmo do hash gerado
    public boolean checkPassword(String rawPassword, String encryptedPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(rawPassword, encryptedPassword);
    }
}
