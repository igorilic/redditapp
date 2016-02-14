(function() {
  'use strict';

  angular
    .module('myreddit')
    .controller('RedditController', RedditController);

  function RedditController($http, $scope) {
    var vm = this;
    vm.stories = [];

    $http.get('https://www.reddit.com/r/politics/new/.json')
      .success(function(data){
        angular.forEach(data.data.children, function(child) {
          vm.stories.push(child.data);
        })
      });

  }
}());
