angular.module('passwordRegister').component('spinner', {
    templateUrl: "components/spinLoader/spinLoader.template.html",
    bindings: {
      spinColor: '@',
      loadColor: '@',
      size: '@'
    },
  });
  