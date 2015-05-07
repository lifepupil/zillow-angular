'use strict';

angular.module('poseidon')
.factory('Neighborhood', function($rootScope, $http, nodeUrl){

  function Neighborhood(obj){
    this._id = obj._id;
    // this.name = obj.name;
  }

  Neighborhood.find = function(){
    return $http.get(nodeUrl + '/neighborhoods')
  }

  Neighborhood.show = function(neighborhoodId){
    return $http.get(nodeUrl + '/neighborhoods/' + neighborhoodId);
  }

  // Neighborhood.prototype.save = function(){
  //   return $http.post(nodeUrl + '/neighborhoods', this);
  // };

	Neighborhood.create = function(neighborhood){
		return $http.post(nodeUrl + '/neighborhoods', neighborhood);
	};

  return Neighborhood;
});
