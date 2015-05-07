/* camelcase:false */

'use strict';

angular.module('poseidon')
.controller('NewNeighborhoodCtrl', function($scope, Map, Neighborhood, $state){

  $scope.createNeighborhood = function(neighborhood) {
    Map.geocode(neighborhood.name, function(results) {
      if(results && results.length) {
        var neighborhood = {};
        neighborhood.name = results[0].formatted_address;
        neighborhood.lat = results[0].geometry.location.lat();
        neighborhood.lng = results[0].geometry.location.lng();
        neighborhood.uid = $scope.activeUser.uid;
        console.log(neighborhood);

        Neighborhood.create(neighborhood)
        .then(function(){
          $state.go('neighborhoods.list');
        });
      }

    });
  };

});
