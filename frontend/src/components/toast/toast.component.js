angular.module("passwordRegister").component("toastComponent", {
    templateUrl: "components/toast/toast.template.html",
    bindings: {
        type: "@",
        message: "@",
        onClose: "&"
    },
    controller: function () {
        this.$onInit = function () {
            this.isActive = true;
            this.icon = this.getIcon(this.type);

            setTimeout(() => {
                this.closeToast();
            }, 2000);
        };

        this.closeToast = function () {
            this.isActive = false;
            setTimeout(() => {
                this.onClose();
            }, 400);
        };

        this.getIcon = function (type) {
            switch (type) {
                case "sucesso":
                    return "fa-solid fa-circle-check";
                case "erro":
                    return "fa-solid fa-x";
                default:
                    return "";
            }
        };
    }
});