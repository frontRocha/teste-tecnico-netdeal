package com.project.passwordRegister.web;

import com.project.passwordRegister.domain.Employee.EmployeeDTO;
import com.project.passwordRegister.domain.Employee.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    //seria uma boa prática criar um DTO para tratar erros (valores, tipos de erros, status e etc) e o response.

    @GetMapping("/data")
    public ResponseEntity getEmployees() {
        try {
            ResponseEntity request = employeeService.getEmployees();

            return request;
        } catch(Exception err) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(err.getMessage());
        }
    }

    @PostMapping("/data")
    public ResponseEntity saveEmployee(@RequestBody EmployeeDTO employeeDTO) {
        try {
            ResponseEntity request = employeeService.saveEmployee(employeeDTO);

            return request;
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(err.getMessage());
        }
    }

    @DeleteMapping("/data/{employeeID}")
    public ResponseEntity deleteEmployee(@PathVariable Long employeeID) {
        try {
            ResponseEntity request = employeeService.deleteEmployee(employeeID);

            return request;
        } catch (Exception err) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(err.getMessage());
        }
    }
}
