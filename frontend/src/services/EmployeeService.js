app.service("EmployeeService", function ($http) {
    let isCreating = false;

    this.setCreating = function (creating) {
        isCreating = creating;
    };

    this.isCreating = function () {
        return isCreating;
    };

    this.setEmployeeCreatingState = function (employee, state) {
        employee.creatingNewEmployee = state;
    };

    this.setEmployeeLoadingState = function (employee, state) {
        employee.loading = state;
    };

    this.resetEmployeeFields = function (component) {
        component.name = "";
        component.password = "";
    };

    this.createModelEmployee = function (name, password, employee) {
        return {
            name: name,
            password: password,
            parentId: employee ? employee.id : null
        }
    };

    this.fetchEmployees = function() {
        return $http.get('http://localhost:8080/employee/data')
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.error('Erro ao buscar os funcionários:', error);
                throw error;
            });
    };

    this.addEmployee = function(employeeData) {
        return $http.post('http://localhost:8080/employee/data', JSON.stringify(employeeData))
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.error('Erro ao adicionar funcionário:', error);
                throw error;
            });
    };

    this.removeEmployee = function(employee) {
        return $http.delete(`http://localhost:8080/employee/data/${employee.id}`)
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.error('Erro ao remover funcionário:', error);
                throw error;
            });
    };

    this.organizeHierarchy = function(employeeList) {
        const employeeMap = {};
        const hierarchy = [];

        employeeList.forEach(employee => {
            employeeMap[employee.id] = { ...employee, children: [] };
        });

        employeeList.forEach(employee => {
            if (employee.parentId) {
                employeeMap[employee.parentId].children.push(employeeMap[employee.id]);
            } else {
                hierarchy.push(employeeMap[employee.id]);
            }
        });

        return hierarchy;
    };

    this.isValidEmployeeData = function (name, password) {
        if (!name || name.trim() === "") {
            throw new Error("O nome é obrigatório e não pode ser vazio.");
        }
        if (!password || password.trim() === "") {
            throw new Error("A senha é obrigatória e não pode ser vazia.");
        }
    };
});