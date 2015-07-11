///<reference path="../../tools/typings/tsd.d.ts" />
(function () {
    var app = angular.module('demoApp', ['ngRoute', 'ngAnimate', "templates"]);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'demoApp.CustomersController',
            templateUrl: 'customers.html',
            controllerAs: 'vm'
        }).when('/orders/:customerId', {
            controller: 'demoApp.OrdersController',
            templateUrl: 'orders.html',
            controllerAs: 'vm'
        });
    }]);
})();

//# sourceMappingURL=../maps/app.module.js.map