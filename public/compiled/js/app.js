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

///<reference path="../../../tools/typings/tsd.d.ts" />
var demoApp;
(function (demoApp) {
    'use strict';
    var CustomersController = (function () {
        function CustomersController(customersFactory) {
            var _this = this;
            this.customers = null;
            customersFactory.getCustomers().success(function (custs) {
                _this.customers = custs;
            });
        }
        CustomersController.$inject = ['demoApp.customersService'];
        return CustomersController;
    })();
    angular.module('demoApp').controller('demoApp.CustomersController', CustomersController);
})(demoApp || (demoApp = {}));

///<reference path="../../../tools/typings/tsd.d.ts" />
var demoApp;
(function (demoApp) {
    var OrdersController = (function () {
        function OrdersController($routeParams) {
            this.customerId = $routeParams.customerId;
        }
        OrdersController.$inject = ['$routeParams'];
        return OrdersController;
    })();
    angular.module('demoApp').controller('demoApp.OrdersController', OrdersController);
})(demoApp || (demoApp = {}));

///<reference path="../../../tools/typings/tsd.d.ts" />
var demoApp;
(function (demoApp) {
    var directives;
    (function (directives) {
        var FilterTextbox = (function () {
            function FilterTextbox() {
                this.template = 'Search: <input type="text" ng-model="vm.filter" /> {{ vm.message }}';
                this.restrict = 'E';
                this.scope = {
                    filter: '='
                };
                this.controllerAs = 'vm';
                this.bindToController = true;
                this.controller = function ($scope) {
                    var vm = this;
                    vm.message = 'Hello';
                    $scope.$watch('vm.filter', function (newVal, oldVal) {
                        if (oldVal !== '' && newVal === '') {
                            vm.message = 'Please enter a value';
                        }
                        else {
                            vm.message = '';
                        }
                    });
                };
            }
            FilterTextbox.instance = function () {
                return new FilterTextbox();
            };
            return FilterTextbox;
        })();
        angular.module('demoApp').directive('filterTextbox', FilterTextbox.instance);
    })(directives = demoApp.directives || (demoApp.directives = {}));
})(demoApp || (demoApp = {}));

///<reference path="../../../tools/typings/tsd.d.ts" />
var demoApp;
(function (demoApp) {
    var CustomersService = (function () {
        function CustomersService($http) {
            this.$http = $http;
        }
        CustomersService.prototype.getCustomers = function () {
            return this.$http.get('customers.json');
        };
        CustomersService.$inject = ['$http'];
        return CustomersService;
    })();
    angular.module('demoApp').service('demoApp.customersService', CustomersService);
})(demoApp || (demoApp = {}));

//# sourceMappingURL=../maps/app.js.map