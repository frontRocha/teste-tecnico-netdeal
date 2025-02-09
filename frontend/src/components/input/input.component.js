angular.module("passwordRegister").component("inputComponent", {
    templateUrl: "components/input/input.template.html",
    bindings: {
        labelText: "@",
        inputValue: "=",
        placeholderText: "@",
        requiredInput: "@",
        pattern: "@",
        minLength: "@",
        maxLength: "@",
        cssClass: "@"
    }
});