

angular.module('city-work-order').controller('EditWorkOrderController', function($scope, $routeParams, $location, flash, WorkOrderResource ) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.workOrder = new WorkOrderResource(self.original);
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The workOrder could not be found.'});
            $location.path("/WorkOrders");
        };
        WorkOrderResource.get({WorkOrderId:$routeParams.WorkOrderId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.workOrder);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The workOrder was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.workOrder.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/WorkOrders");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The workOrder was deleted.'});
            $location.path("/WorkOrders");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.workOrder.$remove(successCallback, errorCallback);
    };
    
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
    
    $scope.get();
});