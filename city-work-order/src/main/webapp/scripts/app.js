'use strict';

angular.module('city-work-order',['ngRoute','ngResource'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/',{templateUrl:'views/landing.html',controller:'LandingPageController'})
      .when('/WorkOrders',{templateUrl:'views/WorkOrder/search.html',controller:'SearchWorkOrderController'})
      .when('/WorkOrders/new',{templateUrl:'views/WorkOrder/detail.html',controller:'NewWorkOrderController'})
      .when('/WorkOrders/edit/:WorkOrderId',{templateUrl:'views/WorkOrder/detail.html',controller:'EditWorkOrderController'})
      .otherwise({
        redirectTo: '/'
      });
  }])
  .controller('LandingPageController', function LandingPageController() {
  })
  .controller('NavController', function NavController($scope, $location) {
    $scope.matchesRoute = function(route) {
        var path = $location.path();
        return (path === ("/" + route) || path.indexOf("/" + route + "/") == 0);
    };
  });
