/* camelcase:false */

'use strict';

angular.module('poseidon')
.controller('NewNeighborhoodCtrl', function($scope, Map, Neighborhood){


  $scope.createNeighborhood = function(neighborhood) {

    Map.geocode(neighborhood.name, function(results) {

      console.log('results', results);
      if(results && results.length) {
        neighborhood.name = results[0].formatted_address;
        neighborhood.lat = results[0].geometry.location.lat();
        neighborhood.lng = results[0].geometry.location.lng();

        var neighborhood = new Neighborhood($scope.neighborhood);
        neighborhood.addStop(neighborhood)
        .then(function(response) {
          $scope.neighborhood = response.data;
          // addMarkers();
        });
      }

    });
  };

});
