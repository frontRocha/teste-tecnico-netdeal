angular.module("passwordRegister").component("listComponent", {
    templateUrl: "components/list/list.template.html",
    bindings: {
        employees: "<",
        onDeleteEmployee: "&",
        onCreateEmployee: "&",
    },
    controller: function (EmployeeService, ToastService) {
        this.name = '';
        this.password = '';

        this.isAnyEmployeeCreating = function () {
            return EmployeeService.isCreating();
        };

        this.addNewFieldsToEmployee = function (employee) {
            try {
                if (EmployeeService.isCreating()) return;

                this.setCreatingOn(employee);
            } catch (error) {
                console.error("Error", error);
            }
        };

        this.cancelCreateNewEmployee = function (employee) {
            try {
                this.resetFields();
            } catch (error) {
                console.error("Erro", error);
            } finally {
                this.hideLoader();
            }
        };

        this.confirmCreateNewEmployee = async function (employee) {
            try {
                EmployeeService.isValidEmployeeData(this.name, this.password);

                employee.loading = true;
                
                const newEmployee = EmployeeService.createModelEmployee(this.name, this.password, employee);
                await this.onCreateEmployee({ employee: newEmployee });
                
                this.resetFields();
            } catch (error) {
                this.showSuccessToast(error, "erro")
                console.error("Error", error);
            } finally {
                this.hideLoader();
            }
        };

        this.onCreateEmployeeInternConfirm = function (employee) {
            try {
                this.onCreateEmployee({ employee: employee });
                this.resetFields();
            } catch (error) {
                console.error("Error", error);
            } 
        };

        this.deleteEmployee = async function (employee) {
            try {
                employee.loading = true;

                await this.onDeleteEmployee({ employee: employee });
                this.resetFields();
            } catch (error) {
                console.error("Error", error);
            } finally {
                this.hideLoader();
            }
        };

        this.resetFields = () => {
            this.name = "";
            this.password = "";

            this.employees.forEach(employee => {
                employee.creatingNewEmployee = false;
            });
            EmployeeService.setCreating(false);
        };

        this.setCreatingOn = (employee) => {
            EmployeeService.setCreating(true);
            employee.creatingNewEmployee = true;
        }

        this.hideLoader = () => {
            this.employees.forEach(employee => {
                employee.isLoading = false;
            });
        }

        this.showSuccessToast = function (message, type) {
            if (type === "sucesso") {
                ToastService.showToast(message, "sucesso");
                return;
            }
                
            ToastService.showToast((message?.toString() || "").replace("Error:", ""), "erro");
        };
    
        this.removeToast = function (toastId) {
            ToastService.removeToast(toastId);
        };
    }
});
