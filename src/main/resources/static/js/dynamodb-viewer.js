var dynamoDbViewer = angular.module('DynamoDbViewer', ['ngTable', 'angular-loading-bar', 'ui.bootstrap']);

dynamoDbViewer.controller("listTables",
    function listTables($scope, $uibModal, $window, $http, ngTableParams, cfpLoadingBar) {
    var tmpHost;
    var tmpPort;
    $scope.init = function(host, port) {
        $scope.tableParams = new ngTableParams(
            { page: 1,
              count: 10 },
            { counts: [],
              total: 1,
              dataset: $scope.tables });

        tmpHost = (host == "" || host == null) ? "localhost" : host;
        tmpPort = (port == "" || port == null) ? "8080" : port;

        var url = "http://" + tmpHost + ":" + tmpPort + "/api/list-tables"
        cfpLoadingBar.start();
        $http.get(url)
            .then(function(response) {
                //First function handles success
                $scope.tables = response.data;
                cfpLoadingBar.complete();
            }, function(response) {
                cfpLoadingBar.complete();
                //Second function handles error
                alert("Can not connect to DynamoDB Local. Please check connection and try again.");
            });
    };
    $scope.inquiry = function(tableName) {

        var url = "http://" + tmpHost + ":" + tmpPort + "/api/inquiry/" + tableName
        var inquiryData;
        $http.get(url)
            .then(function(response) {
                inquiryData = response.data;
                $scope.inquiryData = JSON.stringify(inquiryData, null, "  ");
                $uibModal.open({
                    templateUrl: "inquiry.html",
                    scope: $scope
            });
        }, function(response) {
            alert("Can not connect to DynamoDB Local. Please check connection and try again.");
        });
    };

    $scope.deleteTable = function(tableName) {
        $scope.targetTableName = tableName;
        $scope.operation = "Clear Data";
        var url = "http://" + tmpHost + ":" + tmpPort + "/api/delete/" + tableName
        var inquiryData;

        var modalInstance = $uibModal.open({
            templateUrl: "confirm.html",
            scope: $scope
        });

        modalInstance.result.then(function() {
            $http.get(url)
                .then(function(response) {
                    alert("Table clear finished.")
                }, function(response) {
                    alert("Error happened while deleting. Please check connection and try again.");
                });
        }, function() {});

    };

    $scope.dropTable = function(tableName) {
        $scope.targetTableName = tableName;
        $scope.operation = "Drop";
        var url = "http://" + tmpHost + ":" + tmpPort + "/api/drop/" + tableName
        var inquiryData;

        var modalInstance = $uibModal.open({
            templateUrl: "confirm.html",
            scope: $scope
        });

        modalInstance.result.then(function() {
            $http.get(url)
                .then(function(response) {
                    alert("Table drop finished.")
                    $window.location.reload();
                }, function(response) {
                    alert("Error happened while dropping. Please check connection and try again.");
                });
        }, function() {});

    };
});


dynamoDbViewer.controller("inquiryTable",
    function inquiryTable($scope, $http, ngTableParams, cfpLoadingBar){
    $scope.init = function(tableName, host, port) {
        $scope.tableName = tableName;

        $scope.sortType = '';
        $scope.preSortType = '';
        $scope.setSortType = function(sortType) {
            $scope.sortType = sortType;
        }
        $scope.sortReverse = false;
        $scope.setSortReverse = function(sortReverse) {
        // TODO to put icon for sort order
//            if ($scope.preSortType != $scope.sortType) {
//                $scope.sortReverse = false;
//            } else {
//                $scope.sortReverse = !sortReverse;
//            }
//            $scope.preSortType = $scope.sortType;
                $scope.sortReverse = !sortReverse;
        }
        $scope.searchWord = '';
        $scope.setSearchWord = function(searchWord) {
            $scope.searchWord = searchWord;
        }

    $scope.tableParams = new ngTableParams(
        { page: 1,
          count: 10 },
        { counts: [],
          total: 1,
          dataset: $scope.tables });

        var tmpHost = (host == "" || host == null) ? "localhost" : host;
        var tmpPort = (port == "" || port == null) ? "8080" : port;

        var url = "http://" + tmpHost + ":" + tmpPort + "/api/scan/"
        cfpLoadingBar.start();
        $http.get(url + $scope.tableName)
            .then(function(response) {
                //First function handles success
                $scope.datas = response.data;
                cfpLoadingBar.complete();
            }, function(response) {
                //Second function handles error
                alert("Can not connect to DynamoDB Local. Please check connection and try again.");
                cfpLoadingBar.complete();
            });
        };
    });

dynamoDbViewer.controller("queryTable",
    function inquiryTable($scope, $http, ngTableParams, cfpLoadingBar){
    $scope.init = function(tableName, host, port) {
        $scope.tableName = tableName;

        $scope.sortType = '';
        $scope.setSortType = function(sortType) {
            $scope.sortType = sortType;
        }
        $scope.sortReverse = false;
        $scope.setSortReverse = function(sortReverse) {
            $scope.sortReverse = !sortReverse;
        }
        $scope.searchWord = '';
        $scope.setSearchWord = function(searchWord) {
            $scope.searchWord = searchWord;
        }

    $scope.tableParams = new ngTableParams(
        { page: 1,
          count: 10 },
        { counts: [],
          total: 1,
          dataset: $scope.tables });

    var tmpHost = (host == "" || host == null) ? "localhost" : host;
    var tmpPort = (port == "" || port == null) ? "8080" : port;

    var url = "http://" + tmpHost + ":" + tmpPort + "/api/query/"
    cfpLoadingBar.start();
    $http.get(url + $scope.tableName)
        .then(function(response) {
            //First function handles success
            $scope.datas = response.data;
            cfpLoadingBar.complete();
        }, function(response) {
            //Second function handles error
            alert("Can not connect to DynamoDB Local. Please check connection and try again.");
            cfpLoadingBar.complete();
        });
    };
});
