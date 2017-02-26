(function () {
  'use strict';

  var app = angular.module('myApp', []);

  app.controller('mainCtrl', function ($scope, $http) {

    var onUserComplete = function (response) {
      $scope.user = response.data;
      $http.get($scope.user.repos_url)
        .then(onRepo, onerror);
    };

    var onRepo = function (response) {
      $scope.repos = response.data;
    };

    var onError = function (reason) {
      $scope.error = 'Could not fetch the data';
    };

    $scope.search = function (username) {
      $http.get('https://api.github.com/users/' + username)
        .then(onUserComplete, onError);

    };

    $scope.username = 'vibhanshuc';
    $scope.message = 'GitHub Viewer';
    $scope.repoSortOrder = '-stargazers_count';
    $scope.reposLimit = 5;

    $scope.search($scope.username);
  });
})();