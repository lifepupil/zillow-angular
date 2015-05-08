'use strict';

/*****

TO-DO

1. [x] Update payload to have price, bedrooms, etc.
2. [x] Add webcam photo upload thing.
3. [x] Add markers to houses.
8. [] house markers when clicked, information is displayed
4. [x] Add edit and delete.
5. [] Toggle show for edit/delete based on user login.
6. [] Home page migration to show map shit
7. [] Deploy to AWS/Heroku


*****/

angular.module('poseidon')
.controller('ShowNeighborhoodCtrl', function($scope, $state, Neighborhood, Map, $window){

	$scope.isEdit = false;

	var map;

	Neighborhood.show($state.params.neighborhoodId)
	.then(function(response){
		$scope.neighborhood = response.data;
		$scope.houses = response.data.houses;
		map = Map.create('#map', $scope.neighborhood.lat, $scope.neighborhood.lng, 13);
		addMarkers();
	});

	$scope.editHouse = function(house){
		$scope.house = house;
		$scope.isEdit = true;
	};

	$scope.updateHouse = function(house){
		Neighborhood.updateHouse(house, $state.params.neighborhoodId)
		.then(function(response){
			console.log('updateHouse in show js, response', response);
		});
		$scope.isEdit = false;
	};


	$scope.destroyHouse = function(house) {
    Neighborhood.deleteHouse(house._id, $state.params.neighborhoodId)
		.then(function(reply){
			$window._.remove($scope.houses, {_id: reply.data});
      addMarkers();
		});
	};

	$scope.createHouse = function(house){
		// console.log($state.params);
    Map.geocode(house.address + $scope.neighborhood.name, function(results){
      if(results && results.length){
        house.lat = results[0].geometry.location.lat();
        house.lng = results[0].geometry.location.lng();
				// house.houseId = house._id;
				// console.log('house inside create', house)

        Neighborhood.addHouse(house, $state.params.neighborhoodId)
				.then(function(response){
					$scope.houses = response.data.houses;
					addMarkers();
				});
      }
    });
  };

	$scope.convertPhoto = function(){
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

    reader.onloadend = function () {
      $scope.house.photo = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }

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
