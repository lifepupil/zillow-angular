'use strict';

angular.module('poseidon')
.controller('NewNeighborhoodCtrl', function($scope, Map, Neighborhood){


  $scope.create = function(neighborhood) {
    Map.geocode(neighborhood.name, function(results) {

      if(results && results.length) {
        var newNeighborhood = {};
        newNeighborhood.name = results[0].formatted_address;
        newNeighborhood.lat = results[0].geometry.location.lat();
        newNeighborhood.lng = results[0].geometry.location.lng();

        Neighborhood.create(newNeighborhood);

        // .then(function(response) {
        //   $scope.trip = response.data;
        //   // addMarkers();
        // });
      }

    });
  };

});
