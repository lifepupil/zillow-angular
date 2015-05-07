'use strict';

angular.module('poseidon')
.factory('Neighborhood', function($rootScope, $http, nodeUrl){

  function Neighborhood(){

  }

	Neighborhood.create = function(neighborhood){
		return $http.post(nodeUrl + '/neighborhoods', neighborhood)
	}

  return Neighborhood;
});
