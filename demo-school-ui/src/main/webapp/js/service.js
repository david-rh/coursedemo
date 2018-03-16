    angular.module('patternfly.tableview.demo').service('itemsService', ['$q', function($q) {
     
      this.getItems = function() {
        return $q((resolve, reject) => {
          setTimeout(function() {
            let items = [
              {
              status: "error",
              name: "Fred Flintstone",
              address: "20 Dinosaur Way",
              city: "Bedrock",
              state: "Washingstone"
              },
              {
              status: "error",
              name: "John Smith",
              address: "415 East Main Street",
              city: "Norfolk",
              state: "Virginia",
              },
              {
              status: "warning",
              name: "Frank Livingston",
              address: "234 Elm Street",
              city: "Pittsburgh",
              state: "Pennsylvania"
              },
              {
              status: "ok",
              name: "Linda McGovern",
              address: "22 Oak Street",
              city: "Denver",
              state: "Colorado"
              },
              {
              status: "error",
              name: "Jim Brown",
              address: "72 Bourbon Way",
              city: "Nashville",
              state: "Tennessee"
              },
              {
              status: "ok",
              name: "Holly Nichols",
              address: "21 Jump Street",
              city: "Hollywood",
              state: "California"
              },
              {
              status: "error",
              name: "Marie Edwards",
              address: "17 Cross Street",
              city: "Boston",
              state: "Massachusetts"
              },
              {
              status: "ok",
              name: "Pat Thomas",
              address: "50 Second Street",
              city: "New York",
              state: "New York"
              },
              {
              status: "warning",
              name: "Mike Bird",
              address: "50 Forth Street",
              city: "New York",
              state: "New York"
              },
              {
              status: "error",
              name: "Cheryl Taylor",
              address: "2 Main Street",
              city: "New York",
              state: "New York"
              },
              {
              status: "ok",
              name: "Ren DiLorenzo",
              address: "10 Chase Lane",
              city: "Boston",
              state: "Massacusetts"
              },
              {
              status: "ok",
              name: "Kim Livingston",
              address: "5 Tree Hill Lane",
              city: "Boston",
              state: "Massacusetts"
              }
            ];
            resolve(items);
          }, 10);
        });
      }
     
    }]);