'use strict';

angular.module('poseidon')
.controller('ShowNeighborhoodCtrl', function($scope, $state, Neighborhood, Map, $window){
	Neighborhood.show($state.params.neighborhoodId)
	.then(function(response){
		$scope.neighborhood = response.data;
		var map = Map.create('#map', $scope.neighborhood.lat, $scope.neighborhood.lng, 10);
	});



});
