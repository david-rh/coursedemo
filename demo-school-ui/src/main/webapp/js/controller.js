    angular.module('patternfly.tableview.demo').controller('TableCtrl', ['$scope', '$timeout', '$http', 'itemsService',
    function ($scope, $timeout, $http, itemsService) {
            $scope.dtOptions = {
              // order column(s) should NOT account for 1st checkbox column, table component will adjust col. numbers accordingly
              // Sort by City, then Name
              order: [[1, "desc"]] //,
//              ajax: { url: '/course-catalog-service/rest/courses',
//            	  dataSrc: ''
//              },
//              columns: [ 
//            	  { data: 'number'},
//            	  { data: 'courseName'},
//            	  { data: 'creditHours'},
//            	  { data: 'description'},
//            	  ]
            };
     
            $scope.columns = [
              { header: "Number", itemField: "number" },
              { header: "Name", itemField: "courseName", colActionFn: onNameClick },
              { header: "Credit Hours", itemField: "creditHours"},
              { header: "Description", itemField: "description"}
            ];
     
            $scope.items = "items";
            
            $scope.eventText = "";
     
            $scope.config = {
              onCheckBoxChange: handleCheckBoxChange,
              selectionMatchProp: "courseName",
              itemsAvailable: true,
              showCheckboxes: false
            };
     
            var performEmptyStateAction = function (action) {
              $scope.eventText = action.name + "\r\n" + $scope.eventText;
            };
     
            $scope.emptyStateConfig = {
              icon: 'pficon-warning-triangle-o',
              title: 'No Items Available',
              info: "This is the Empty State component. The goal of a empty state pattern is to provide a good first impression that helps users to achieve their goals. It should be used when a view is empty because no objects exists and you want to guide the user to perform specific actions.",
              helpLink: {
                label: 'For more information please see',
                urlLabel: 'pfExample',
                url : '#/api/patternfly.views.component:pfEmptyState'
              }
            };
     
            $scope.emptyStateActionButtons = [
              {
                name: 'Main Action',
                title: 'Perform an action',
                actionFn: performEmptyStateAction,
                type: 'main'
              }
            ];
     
            function handleCheckBoxChange (item) {
              $scope.eventText = item.name + ' checked: ' + item.selected + '\r\n' + $scope.eventText;
            };
     
            var performAction = function (action, item) {
              $scope.eventText = item.name + " : " + action.name + "\r\n" + $scope.eventText;
            };
     
            function onNameClick (name) {
              $scope.eventText = "You clicked on " + name + "\n" + $scope.eventText;
            }
     
            $scope.actionButtons = [
              {
                name: 'Action',
                title: 'Perform an action',
                actionFn: performAction
              }
            ];
     
            $scope.menuActions = [
              {
                name: 'Action',
                title: 'Perform an action',
                actionFn: performAction
              },
              {
                name: 'Another Action',
                title: 'Do something else',
                actionFn: performAction
              },
              {
                name: 'Disabled Action',
                title: 'Unavailable action',
                actionFn: performAction,
                isDisabled: true
              },
              {
                name: 'Something Else',
                title: '',
                actionFn: performAction
              },
              {
                isSeparator: true
              },
              {
                name: 'Grouped Action 1',
                title: 'Do something',
                actionFn: performAction
              },
              {
                name: 'Grouped Action 2',
                title: 'Do something similar',
                actionFn: performAction
              }
            ];
     
            $scope.showComponent = true;
     
            $scope.addNewComponentToDOM = function () {
              $scope.showComponent = false;
              $timeout(() => $scope.showComponent = true);
            };
     
            (function init() {
            	$http.get("/course-catalog-service/rest/courses")
          	  .then(function(response) {
                    //First function handles success
                    $scope.items = response.data;
                })
            })();
          }
        ]);