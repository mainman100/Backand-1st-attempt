var app = angular.module('myApp', ['ngTouch', 'ui.grid', 'backand', 'ngCookies']);

app.controller('MainCtrl', ['Backand', 'ProjectsService', '$scope', '$cookieStore', function (Backand, $cookieStore, ProjectsService, $scope) {
    
    $scope.username = "richard@ruskoway.com";
    $scope.password = "test123";
    $scope.signIn = function() {
      Backand.signin($scope.username, $scope.password)
      .then(
        function (response) {
          //Do good for the world
            $scope.loggedIn = 'loggedin';
        },
        function (data, status, headers, config) {
          //handle error
            $scope.loggedIn = 'not logged in';
        }
      );
    }
    
    $scope.gridOptions = {
        excludeProperties: '__metadata',
    };

    $scope.load = function () {
        ProjectsService.readAll().then(function (response) {
            $scope.gridOptions.data = response.data;
        });
    }
    $scope.signIn();
    $scope.load();
}]);

//Update Angular configuration section
  app.config(function (BackandProvider) {
      BackandProvider.manageDefaultHeaders();
      BackandProvider.setAppName('ruskoway');
      //BackandProvider.setSignUpToken('Your-SignUp-Token');
   //   BackandProvider.setAnonymousToken('');

  });


(function () {

    angular.module('myApp')
        .service('ProjectsService', ['$http','Backand', ProjectsService]);

    function ProjectsService($http, Backand) {

        var self = this;
        var baseUrl = Backand.getApiUrl() +'/1/objects/';
        var objectName = 'projects';
        // var anonymousToken = '5c1c657e-69a1-4472-984c-7f2205bedbe4';
        self.readAll = function () {
            console.log('readAll');
            return $http({
                method: 'GET',
                url: baseUrl + objectName,
              // headers: anonymousToken
            }).then(function (response) {
                return response.data;
            });
        };

        self.readOne = function (id) {
            return $http({
                method: 'GET',
                url: baseUrl + objectName + '/' + id,
            //    headers: anonymousToken
            }).then(function (response) {
                return response.data;
            });
        };

        self.create = function (data) {
            return $http({
                method: 'POST',
                url: baseUrl + objectName,
                data: data,
                params: {
                    returnObject: true
                },
                headers: anonymousToken
            }).then(function (response) {
                return response.data;
            });
        };

        self.update = function (id, data) {
            return $http({
                method: 'PUT',
                url: baseUrl + objectName + '/' + id,
                data: data,
             //   headers: anonymousToken
            }).then(function (response) {
                return response.data;
            });
        };

        self.delete = function (id) {
            return $http({
                method: 'DELETE',
                url: baseUrl + objectName + '/' + id,
                headers: anonymousToken
            });
        };

    }
}());
