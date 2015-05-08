'use strict';

angular.module('poseidon')
.controller('ListNeighborhoodCtrl', function($scope, $state, Neighborhood, $window, Map){
	$scope.editing = false;


	Neighborhood.find()
	.then(function(response){
		$scope.neighborhoods = response.data.neighborhoods;
		// busted condition
		if($scope.activeUser && response.data.neighborhoods[0].uid === $scope.activeUser.uid){
			$scope.isEdit = true;
			$scope.isDelete = true;
		}
	});


  $scope.createNeighborhood = function(neighborhood) {
    Map.geocode(neighborhood.name, function(results) {
      if(results && results.length) {
        var neighborhood = {};
        neighborhood.name = results[0].formatted_address;
        neighborhood.lat = results[0].geometry.location.lat();
        neighborhood.lng = results[0].geometry.location.lng();
        neighborhood.uid = $scope.activeUser.uid;
        // console.log(neighborhood);

        Neighborhood.create(neighborhood)
        .then(function(response){
					console.log('INSIDE createNeighborhood response', response, 'response.data', response.data);
					$scope.neighborhoods.push(response.data);
        });
      }
    });
  };

	$scope.deleteNeighborhood = function(neighborhood) {
		Neighborhood.destroy(neighborhood._id)
		.then(function(response) {
			// console.log('deleteNeighborhood', response.data);
			$window._.remove($scope.neighborhoods, {_id: response.data._id});
		});
	};

	$scope.editNeighborhood = function(neighborhood){
		$scope.editing = true;
		$scope.neighborhood = neighborhood;
	};

	$scope.updateNeighborhood = function(n){

		var neighborhood = angular.copy(n);

		Map.geocode(neighborhood.name, function(results) {
      if(results && results.length) {
        neighborhood.name = results[0].formatted_address;
        neighborhood.lat = results[0].geometry.location.lat();
        neighborhood.lng = results[0].geometry.location.lng();
        neighborhood.uid = $scope.activeUser.uid;
				delete neighborhood._id;
				delete neighborhood.__v;

				$scope.neighborhood = neighborhood;
        Neighborhood.update(neighborhood, n._id)
        .then(function(response){
					Neighborhood.find()
					.then(function(response){
						$scope.neighborhoods = response.data.neighborhoods;
					});
        });
      }
    });

		$scope.editing = false;
		$scope.neighborhood = {};

	};

});
