package com.project.passwordRegister.domain.Employee;

import com.project.passwordRegister.infra.CrudBase.CrudBaseServiceImpl;
import com.project.passwordRegister.infra.PasswordEncrypt.PasswordEncrypt;
import com.project.passwordRegister.infra.PasswordStrengthChecker.PasswordStrengthChecker;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService extends CrudBaseServiceImpl<Employee, Long> {

    private final PasswordStrengthChecker passwordStrengthChecker;
    private final PasswordEncrypt passwordEncrypt;
    private final EmployeeRepository employeeRepository;

    private static final String EMPLOYEE_NOT_FOUND_MSG = "Employee not found";

    public EmployeeService(JpaRepository<Employee, Long> repository,
                           PasswordStrengthChecker passwordStrengthChecker,
                           PasswordEncrypt passwordEncrypt,
                           EmployeeRepository employeeRepository) {
        super(repository);

        this.passwordStrengthChecker = passwordStrengthChecker;
        this.passwordEncrypt = passwordEncrypt;
        this.employeeRepository = employeeRepository;
    }

    public ResponseEntity<List<EmployeeDTO>> getEmployees() {
        List<Employee> employees = super.findAll();

        List<EmployeeDTO> response = mapEmployeesToDTOs(employees);
        return ResponseEntity.ok(response);
    }

    @Transactional
    public ResponseEntity<Void> saveEmployee(EmployeeDTO employeeDTO) throws Exception {
        validateEmployeeData(employeeDTO);

        String encryptedPassword = encryptPassword(employeeDTO);
        int passwordStrength = calculatePasswordStrength(employeeDTO.getPassword());
        PasswordStatus passwordStatus = classifyPasswordStrength(passwordStrength);

        Employee employee = buildEmployee(employeeDTO, encryptedPassword, passwordStrength, passwordStatus);

        super.save(employee);

        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity deleteEmployee(Long employeeID) throws Exception {
        Employee employeeDB = findEmployeeById(employeeID);

        List<Employee> subordinates = findAllSubordinates(employeeDB.getId());
        deleteEmployeesAndSubordinates(subordinates);

        super.deleteById(employeeDB.getId());

        return ResponseEntity.ok().build();
    }

    private List<EmployeeDTO> mapEmployeesToDTOs(List<Employee> employees) {
        return employees.stream()
                .map(employee -> new EmployeeDTO.EmployeeDTOBuilder()
                        .id(employee.getId())
                        .name(employee.getName())
                        .passwordStrength(employee.getPasswordStrength())
                        .passwordStatus(employee.getPasswordStatus().name())
                        .parentId(getParentId(employee))
                        .createdAt(employee.getCreatedAt())
                        .updatedAt(employee.getUpdatedAt())
                        .build())
                .toList();
    }

    private String encryptPassword(EmployeeDTO employeeDTO) {
        return passwordEncrypt.encryptPassword(employeeDTO);
    }

    private int calculatePasswordStrength(String password) {
        return passwordStrengthChecker.calculatePasswordStrength(password);
    }

    private PasswordStatus classifyPasswordStrength(int passwordStrength) {
        return passwordStrengthChecker.classifyPassword(passwordStrength);
    }

    private Employee buildEmployee(EmployeeDTO employeeDTO, String encryptedPassword, int passwordStrength, PasswordStatus passwordStatus) throws Exception {
        Employee.EmployeeBuilder employeeBuilder = new Employee.EmployeeBuilder()
                .name(employeeDTO.getName())
                .password(encryptedPassword)
                .passwordStrength(passwordStrength)
                .passwordStatus(passwordStatus);

        if (employeeDTO.getParentId() != null) {
            Employee parentEmployee = findEmployeeById(employeeDTO.getParentId());
            employeeBuilder.parent(parentEmployee);
        }

        return employeeBuilder.build();
    }

    private void deleteEmployeesAndSubordinates(List<Employee> subordinates) {
        for (Employee subordinate : subordinates) {
            List<Employee> subSubordinates = findAllSubordinates(subordinate.getId());
            deleteEmployeesAndSubordinates(subSubordinates);
            super.deleteById(subordinate.getId());
        }
    }

    private Employee findEmployeeById(Long employeeId) throws Exception {
        return super.findByID(employeeId)
                .orElseThrow(() -> new RuntimeException(EMPLOYEE_NOT_FOUND_MSG));
    }

    private Long getParentId(Employee employee) {
        return employee.getParent() != null ? employee.getParent().getId() : null;
    }

    public List<Employee> findAllSubordinates(Long managerId) {
        List<Employee> allSubordinates = new ArrayList<>();
        List<Employee> directSubordinates = employeeRepository.findAllByParentId(managerId);

        for (Employee subordinate : directSubordinates) {
            allSubordinates.add(subordinate);
            allSubordinates.addAll(findAllSubordinates(subordinate.getId()));
        }

        return allSubordinates;
    }

    private void validateEmployeeData(EmployeeDTO employeeDTO) throws Exception {
        validateNameNotEmpty(employeeDTO);
        validatePasswordNotEmpty(employeeDTO);
    }

    private void validatePasswordNotEmpty(EmployeeDTO employeeDTO) throws Exception {
        if (employeeDTO.getPassword() == null || employeeDTO.getPassword().isEmpty()) {
            throw new Exception("Password cannot be empty");
        }
    }

    private void validateNameNotEmpty(EmployeeDTO employeeDTO) throws Exception {
        if (employeeDTO.getName() == null || employeeDTO.getName().isEmpty()) {
            throw new Exception("Name cannot be empty");
        }
    }
}