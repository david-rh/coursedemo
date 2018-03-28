    angular.module('patternfly.tableview.demo').service('itemsService', ['$q', '$http', function($q, $http) {
     
      this.getItems = function() {
    	  
    	  return $http.get("/course-catalog-service/api/courses")
    	  .then(function(response) {
              //First function handles success
              return response.data;
          })
    	  
          
//        return $q((resolve, reject) => {
//          setTimeout(function() {
//            let items = [
//              {
//              status: "error",
//              name: "Fred Flintstone",
//              address: "20 Dinosaur Way",
//              city: "Bedrock",
//              state: "Washingstone"
//              },
//              {
//              status: "ok",
//              name: "Kim Livingston",
//              address: "5 Tree Hill Lane",
//              city: "Boston",
//              state: "Massacusetts"
//              }
//            ];
//            resolve(items);
//          }, 10);
//        });
      }
     
    }]);