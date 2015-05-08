'use strict';

angular.module('poseidon')
.controller('HomeCtrl', function($scope, $state, $window, Neighborhood, Map){
	console.log('home');

	var map;
	map = Map.create('#map-main', 0, 0, 1);
	// Neighborhood.show($state.params.neighborhoodId)
	// .then(function(response){
	// 	$scope.neighborhood = response.data;
	// 	$scope.houses = response.data.houses;
	// 	map = Map.create('#map', $scope.neighborhood.lat, $scope.neighborhood.lng, 1);
	// 	addMarkers();
	// });
	//
  // var markers = [];
	// function addMarkers(){
	// 	clearMarkers();
	// 	markers = $scope.houses.map(function(h){
	// 		return Map.addMarker(map, h.lat, h.lng, h.address, '/assets/redhouse.png');
	// 	});
	// }
	//
	// function clearMarkers(){
	// 	markers.forEach(function(m){
	// 		m.setMap(null);
	// 	});
	// 	markers = [];
	// }



});
