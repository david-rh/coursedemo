angular.module('city-work-order').factory('WorkOrderResource', function($resource){
    var resource = $resource('api/workorders/:WorkOrderId',{WorkOrderId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});