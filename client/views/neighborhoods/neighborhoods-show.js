'use strict';

angular.module('poseidon')
.controller('ShowNeighborhoodCtrl', function($scope, $state, Neighborhood, Map, $window){
	Neighborhood.show($state.params.neighborhoodId)
	.then(function(response){
		$scope.neighborhood = response.data;
		$scope.houses = response.data.houses;
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
					$scope.houses = response.data.houses;
				})
      }
    });
  };

  var markers = [];


	function addMarkers(){
		clearMarkers();
		markers = $scope.houses.map(function(h){
			return Map.addMarker(map, h.lat, h.lng, h.name, '/assets/marker.png');
		});
	}

	function clearMarkers(){
		markers.forEach(function(m){
			m.setMap(null);
		});
		markers = [];
	}
});
