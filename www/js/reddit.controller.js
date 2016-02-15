(function() {
  'use strict';

  angular
    .module('myreddit')
    .controller('RedditController', RedditController);

  function RedditController($http, $scope) {
    var vm = this;
    vm.stories = [];
    vm.loadMore = loadMore;
    vm.doRefresh = doRefresh;
    vm.openLink = openLink;
    ///////////////
    function openLink(url) {
      window.open(url, '_blank');
    }

    function loadMore() {
      var params = {};
      if (vm.stories.length > 0) {
        params['after'] = vm.stories[vm.stories.length - 1].name;
      }
      loadStories(params, function(olderStories) {
        vm.stories = vm.stories.concat(olderStories);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    function doRefresh() {
      var params = {
        'before': vm.stories[0].name
      };
      loadStories(params, function(newerStories) {
        vm.stories = newerStories.concat(vm.stories);
        $scope.$broadcast('scroll.refreshComplete');
      });
    }

    function loadStories(params, callback) {

      $http.get('https://www.reddit.com/r/eu4/new/.json', {params: params})
        .success(function(data){
          var stories = [];
          angular.forEach(data.data.children, function(child) {
            stories.push(child.data);
          });
          callback(stories);
        });
    }

    // $scope.$on = ('$stateChangeSuccess', function() {
    //   $scope.loadMore();
    // });

  }
}());
