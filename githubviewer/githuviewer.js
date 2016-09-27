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
    var person = {
      firstName: 'Vibhanshu',
      lastName: 'Chaturvedi',
      imageSource: 'https://s.gravatar.com/avatar/5b7f8e748e276bc6b9553f1f51ab78ab'
    };
    $scope.username = 'vibhanshuc';
    $scope.message = 'GitHub Viewer';
    $scope.person = person;
    $scope.repoSortOrder = '-stargazers_count';
    $scope.reposLimit = 5;
  });
})();