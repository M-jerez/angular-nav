///<reference path="../../../tools/typings/tsd.d.ts" />
var demoApp;
(function (demoApp) {
    var OrdersController = (function () {
        //static $inject = ['$routeParams'];
        function OrdersController($routeParams) {
            this.customerId = $routeParams.customerId;
        }
        return OrdersController;
    })();
    angular.module('demoApp').controller('demoApp.OrdersController', OrdersController);
})(demoApp || (demoApp = {}));

//# sourceMappingURL=../../maps/controllers/orders.controller.js.map