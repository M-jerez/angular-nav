angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("customers.html","<div>\n    <filter-textbox filter=\"vm.filter\"></filter-textbox>\n    <br />\n    <h3>Customers:</h3>\n    <table>\n        <tr ng-repeat=\"cust in vm.customers |  filter:vm.filter | orderBy:\'name\'\">\n            <td><a href=\"#/orders/{{ cust.id }}\">{{ cust.name  }}</a></td>\n            <td>{{ cust.total | currency }}</td>\n        </tr>\n    </table>\n</div>\n");
$templateCache.put("orders.html","<h3>Orders</h3>\n\nCustomerID: {{ vm.customerId }}\n<br />\n<table>\n    <tr>\n        <td>Baseball</td>\n        <td>$9.99</td>\n    </tr>\n    <tr>\n        <td>Bat</td>\n        <td>$19.99</td>\n    </tr>\n</table>\n\n<br />\n\n<a href=\"#/\">Customers</a>\n");}]);