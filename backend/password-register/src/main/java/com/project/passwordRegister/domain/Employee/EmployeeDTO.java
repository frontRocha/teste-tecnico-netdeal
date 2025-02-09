package com.project.passwordRegister.domain.Employee;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class EmployeeDTO {
    public Long id;

    @Column(nullable = false)
    public String name;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public String password;

    public String passwordStatus;
    public Long parentId;
    public int passwordStrength;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public LocalDateTime createdAt;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    public LocalDateTime updatedAt;
}
