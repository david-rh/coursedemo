
angular.module('city-work-order').controller('NewWorkOrderController', function ($scope, $location, locationParser, flash, WorkOrderResource ) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.workOrder = $scope.workOrder || {};
    
    $scope.problemTypeList = [
        "AbandonedVehicle",
        "AnimalComplaint",
        "DamagedFallenTree",
        "Graffiti",
        "Pothole",
        "Snow",
        "Other"
    ];
    
    $scope.statusList = [
        "New",
        "Assigned",
        "InProgress",
        "Complete"
    ];
    

    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The workOrder was created successfully.'});
            $location.path('/WorkOrders');
        };
        var errorCallback = function(response) {
            if(response && response.data) {
                flash.setMessage({'type': 'error', 'text': response.data.message || response.data}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        WorkOrderResource.save($scope.workOrder, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/WorkOrders");
    };
});