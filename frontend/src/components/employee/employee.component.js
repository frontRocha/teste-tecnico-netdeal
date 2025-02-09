angular.module("passwordRegister").component("employeeComponent", {
    templateUrl: "components/employee/employee.template.html",
    bindings: {
        cssClass: "@",
        name: "<",
    },
});