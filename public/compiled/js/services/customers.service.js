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

//# sourceMappingURL=../../maps/services/customers.service.js.map