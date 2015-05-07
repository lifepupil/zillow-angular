'use strict';

angular.module('poseidon')
.factory('Neighborhood', function($rootScope, $http, nodeUrl){

  function Neighborhood(obj){
    this._id = obj._id;
    // this.name = obj.name;
  }


  Neighborhood.destroy = function(neighborhoodId){
    return $http.delete(nodeUrl + '/neighborhoods/' + neighborhoodId);
  }

  Neighborhood.find = function(){
    return $http.get(nodeUrl + '/neighborhoods')
  }

  Neighborhood.show = function(neighborhoodId){
    return $http.get(nodeUrl + '/neighborhoods/' + neighborhoodId);
  }

  Neighborhood.addHouse = function(house, neighborhoodId){
    return $http.post(nodeUrl + '/neighborhoods/' + neighborhoodId + '/houses', house)
  }

  // Neighborhood.prototype.save = function(){
  //   return $http.post(nodeUrl + '/neighborhoods', this);
  // };

	Neighborhood.create = function(neighborhood){
		return $http.post(nodeUrl + '/neighborhoods', neighborhood);
	};

  Neighborhood.update = function(neighborhood, id){
    // console.log(id);
    return $http.put(nodeUrl + '/neighborhoods/' + id, neighborhood);
  }

  return Neighborhood;
});
