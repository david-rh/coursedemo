    angular.module('patternfly.tableview.demo').controller('TableCtrl', ['$scope', '$timeout', 'itemsService',
    function ($scope, $timeout, itemsService) {
            $scope.dtOptions = {
              // order column(s) should NOT account for 1st checkbox column, table component will adjust col. numbers accordingly
              // Sort by City, then Name
              order: [[3, "asc"], [1, "desc"]],
            };
     
            $scope.columns = [
              { header: "Status", itemField: "status", htmlTemplate: "status_template.html" },
              { header: "Name", itemField: "name", htmlTemplate: "name_template.html", colActionFn: onNameClick },
              { header: "Address", itemField: "address"},
              { header: "City", itemField: "city", templateFn: function(value, item) { return '<a href="#' + item.name + '" title="' + item.address + '">' + value + '</span>' } },
              { header: "State", itemField: "state"}
            ];
     
            $scope.items = null;
     
            $scope.eventText = "";
     
            $scope.config = {
              onCheckBoxChange: handleCheckBoxChange,
              selectionMatchProp: "name",
              itemsAvailable: true,
              showCheckboxes: true
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
              },
              {
                name: 'Secondary Action 1',
                title: 'Perform an action',
                actionFn: performEmptyStateAction
              },
              {
                name: 'Secondary Action 2',
                title: 'Perform an action',
                actionFn: performEmptyStateAction
              },
              {
                name: 'Secondary Action 3',
                title: 'Perform an action',
                actionFn: performEmptyStateAction
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
              itemsService.getItems()
                .then(items => $scope.items = items);
            })();
          }
        ]);