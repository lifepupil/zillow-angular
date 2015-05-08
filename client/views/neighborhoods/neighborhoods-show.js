'use strict';

/*****

TO-DO

1. [x] Update payload to have price, bedrooms, etc.
2. [] Add webcam photo upload thing.
3. [x] Add markers to houses.
8. [] house markers when clicked, information is displayed
4. [] Add edit and delete.
5. [] Toggle show for edit/delete based on user login.
6. [] Home page migration to show map shit
7. [] Deploy to AWS/Heroku


*****/

angular.module('poseidon')
.controller('ShowNeighborhoodCtrl', function($scope, $state, Neighborhood, Map){

	var map;

	Neighborhood.show($state.params.neighborhoodId)
	.then(function(response){
		$scope.neighborhood = response.data;
		$scope.houses = response.data.houses;
		map = Map.create('#map', $scope.neighborhood.lat, $scope.neighborhood.lng, 13);
		addMarkers();
	});

	$scope.create = function(house){
		console.log($state.params);
    Map.geocode(house.address + $scope.neighborhood.name, function(results){
      if(results && results.length){
        house.lat = results[0].geometry.location.lat();
        house.lng = results[0].geometry.location.lng();

				console.log('house inside create', house)

        Neighborhood.addHouse(house, $state.params.neighborhoodId)
				.then(function(response){
					$scope.houses = response.data.houses;
					console.log('response', response);
					console.log('inside addHouse then in show js',house.photo);
					addMarkers();
				});
      }
    });
  };

  var markers = [];


	function addMarkers(){
		clearMarkers();
		markers = $scope.houses.map(function(h){
			return Map.addMarker(map, h.lat, h.lng, h.address, '/assets/redhouse.png');
		});
	}

	function clearMarkers(){
		markers.forEach(function(m){
			m.setMap(null);
		});
		markers = [];
	}
});
