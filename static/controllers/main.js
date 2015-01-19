app.controller('MainCtrl', function MainCtrl($scope, $route, $timeout, API_URL, AdsFactory){
  'use strict';

  $scope.preloaded = [];
  $scope.products = [];
  $scope.predicate = "";
  $scope.loading = true;
  $scope.progress = 0;

  var limit = 5,
      skip = 0;

  var used_ads = [];

  function start(limit, skip) {
    var counter = 1;
    oboe(API_URL + '/api/products?limit=' + limit + '&skip=' + skip)
    .node('{id}', function(data) {
      
      if (counter < limit) {
        counter ++;
        $scope.progress = (counter / 5) * 100;
      } else {
        $timeout(function() {
          $scope.loading = false;
        }, 1000);
      }

      $scope.products.push(data);
      $route.reload();
    }) 
  }

  function preload(limit, skip) {
    var counter = 1;
    oboe(API_URL + '/api/products?limit=' + limit + '&skip=' + skip)
    .node('{id}', function(data) {
      $scope.preloaded.push(data);
    })
  }

  function addProducts() {
    $scope.products = $scope.products.concat($scope.preloaded);
    $scope.preloaded.length = 0;
    $route.reload();

    preload(limit, skip);
  }

  function getNext() {
    skip += limit;
    addProducts(limit, skip);
  }

  function run() {
    start(limit, skip);
    preload(limit, skip);
    getNext();
  }

  // get first products + initialize preloader;
  run();

  $scope.getNext = function() {
    getNext();
  };

  $scope.setPredicate = function(predicate) {
    $scope.predicate = predicate;
  };

  $scope.getFreshId = function() {
    return AdsFactory.getId();
  }
});