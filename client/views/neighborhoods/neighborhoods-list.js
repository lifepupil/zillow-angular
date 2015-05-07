'use strict';

angular.module('poseidon')
.controller('ListNeighborhoodCtrl', function($scope, Neighborhood){
	Neighborhood.find()
	.then(function(response){
		$scope.neighborhoods = response.data.neighborhoods;
	});

});
