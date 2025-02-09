angular.module("passwordRegister").component("badgeComponent", {
    templateUrl: "components/badge/badge.template.html",
    bindings: {
        cssClass: "@",
        passwordStatus: "<"
    },
    controller: function() {
        const statusMap = {
            STRONG: 'Forte',
            AVERAGE: 'Média',
            GOOD: 'Boa',
            BAD: 'Fraca'
        };

        this.getTranslatedStatus = function() {
            return statusMap[this.passwordStatus.toUpperCase()] || this.passwordStatus;
        };
    }
});
