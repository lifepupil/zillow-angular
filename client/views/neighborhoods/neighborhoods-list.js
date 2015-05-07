'use strict';

angular.module('poseidon')
.controller('ListNeighborhoodCtrl', function($scope, Neighborhood, $window){

	Neighborhood.find()
	.then(function(response){
		$scope.neighborhoods = response.data.neighborhoods;
	});

	$scope.deleteNeighborhood = function(neighborhood) {
		console.log('in deleteNeighborhood', neighborhood)
		Neighborhood.destroy(neighborhood._id)
		.then(function(response) {
			// console.log('deleteNeighborhood', response.data);
			$window._.remove($scope.neighborhoods, {_id: response.data._id});
		});
	};

});
