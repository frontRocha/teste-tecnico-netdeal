app.service("ToastService", function ($rootScope) {
    var toastList = [];

    this.showToast = function (message, type) {
        var toast = {
            id: new Date().getTime(),
            message: message,
            type: type
        };
        toastList.push(toast);
        $rootScope.$broadcast("toastUpdated");
        return toast.id;
    };

    this.removeToast = function (toastId) {
        toastList = toastList.filter(function (toast) {
            return toast.id !== toastId;
        });
        $rootScope.$broadcast("toastUpdated");
    };

    this.getToasts = function () {
        return toastList;
    };
});