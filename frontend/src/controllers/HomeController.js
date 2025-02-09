app.controller("HomeController", function ($scope, EmployeeService, ToastService) {
    $scope.name;
    $scope.password;
    $scope.isLoading;
    $scope.employees = [];
    $scope.toasts;

    $scope.initializeComponent = function () {
        $scope.getEmployees();
    };

    $scope.$on("toastUpdated", function () {
        $scope.toasts = ToastService.getToasts();
    });

    $scope.getEmployees = async function () {
        try {
            const employeesData = await EmployeeService.fetchEmployees();
            $scope.employees = EmployeeService.organizeHierarchy(employeesData);

            $scope.toasts = ToastService.getToasts()
            $scope.$apply();
        } catch (error) {
            console.error(error);
        }
    };

    $scope.registerNewEmployee = async function () {
        try {
            if (EmployeeService.isCreating()) return;
            EmployeeService.isValidEmployeeData(this.name, this.password);

            $scope.isLoading = true;

            const newEmployee = EmployeeService.createModelEmployee($scope.name, $scope.password, null)
            
            await EmployeeService.addEmployee(newEmployee);
            await $scope.getEmployees();

            $scope.resetFields();
            $scope.showSuccessToast("Registrado com sucesso", "sucesso");
        } catch (error) {
            console.error("Erro no controlador:", error);
        } finally {
            $scope.isLoading = false;
            $scope.$apply();
        }
    };

    $scope.registerNewEmployeeWithParentId = async function (employee) {
        try {
            await EmployeeService.addEmployee(employee);
            await $scope.getEmployees();

            $scope.showSuccessToast("Registrado com sucesso", "sucesso");
            $scope.$apply();
        }
         catch(error) {
            console.error("Erro no controlador: ", error)
            $scope.showSuccessToast("Erro no servidor, tente novamente mais tarde", "erro");
        }
    }

    $scope.deleteEmployee = async function (employee) {
        try {
            await EmployeeService.removeEmployee(employee);
            await $scope.getEmployees();

            $scope.showSuccessToast("Deletado com sucesso", "sucesso");
            $scope.$apply();
        } catch(error) {
            console.error("Erro no controlador: ", error)
            $scope.showSuccessToast("Erro no servidor, tente novamente mais tarde", "erro");
        }
    }

    $scope.resetFields = () => {
        $scope.name = "";
        $scope.password = "";

        $scope.isLoading = false;
    }

    $scope.showSuccessToast = function (message, type) {
        if (type === "sucesso") {
            ToastService.showToast(message, "sucesso");
            $scope.$apply();

            return;
        }
            
        ToastService.showToast((message?.toString() || "").replace("Error:", ""), "erro");

        $scope.$apply();
    };

    $scope.removeToast = function (toastId) {
        ToastService.removeToast(toastId);
        $scope.$apply()
    };
});
