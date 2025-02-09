angular.module("passwordRegister").component("buttonComponent", {
    templateUrl: "components/button/button.template.html",
    bindings: {
        cssClass: "@",
        typeButton: "@",
        buttonText: "@",
        submit: "&",
        disabled: '<?',
        form: '<?',
        icon: '@',
        isLoading: "<",
    },
    controller: function () {
        this.disabled = this.disabled || false;
        
        this.submit = function () {
            if (this.form.$valid) {
                this.submit();
            }
        };
    }
});