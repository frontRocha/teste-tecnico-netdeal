angular.module("passwordRegister").component("percentageComponent", {
    templateUrl: "components/percentage/percentage.template.html",
    bindings: {
        cssClass: "@",
        passwordStrength: "<",
        passwordStatus: "<"
    },
});