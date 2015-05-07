'use strict';

angular.module('poseidon')
.controller('ShowNeighborhoodCtrl', function($scope, $state, Neighborhood, Map, $window){
	Neighborhood.show($state.params.neighborhoodId)
	.then(function(response){
		$scope.neighborhood = response.data;
		var map = Map.create('#map', $scope.neighborhood.lat, $scope.neighborhood.lng, 11);
	});

	$scope.create = function(house){
		console.log($state.params);
    Map.geocode(house.address + $scope.neighborhood.name, function(results){
      if(results && results.length){
        house.lat = results[0].geometry.location.lat();
        house.lng = results[0].geometry.location.lng();
        Neighborhood.addHouse(house, $state.params.neighborhoodId)
				.then(function(response){
					console.log('hooray');
				})
      }
    });
  };

});
