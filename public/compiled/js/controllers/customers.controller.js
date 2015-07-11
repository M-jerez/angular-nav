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

//# sourceMappingURL=../../maps/controllers/customers.controller.js.map