'use strict';

angular.module('poseidon')
.controller('ListNeighborhoodCtrl', function($scope, $state, Neighborhood, $window){

	Neighborhood.find()
	.then(function(response){
		$scope.neighborhoods = response.data.neighborhoods;
		// busted condition
		if($scope.activeUser && response.data.neighborhoods[0].uid == $scope.activeUser.uid){
			$scope.isEdit = true;
			$scope.isDelete = true;
		}

	});

	$scope.deleteNeighborhood = function(neighborhood) {
		console.log('in deleteNeighborhood', neighborhood)
		Neighborhood.destroy(neighborhood._id)
		.then(function(response) {
			// console.log('deleteNeighborhood', response.data);
			$window._.remove($scope.neighborhoods, {_id: response.data._id});
		});
	};

	$scope.editNeighborhood = function(neighborhood){
		debugger;
		console.log($state.params);
	}

});
