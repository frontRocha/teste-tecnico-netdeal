var app = angular.module("passwordRegister", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "views/home/home.html",
            controller: "HomeController",
            controllerAs: "$ctrl"
        })
        .otherwise({
            redirectTo: "/home"
        });

    $locationProvider.hashPrefix('');
});