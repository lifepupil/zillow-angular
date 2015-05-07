'use strict';

angular.module('poseidon')
.factory('Map', function($window) {

	function Map() {
	}

	Map.geocode = function(address, cb) {
		var geocoder = new $window.google.maps.Geocoder();
		geocoder.geocode({address: address}, cb);
	};

	Map.create = function(selector, lat, lng, zoom) {
		selector = angular.element(selector).get(0);
		var options = {
			center: new $window.google.maps.LatLng(lat, lng),
			zoom: zoom,
			mapTypeId: $window.google.maps.MapTypeId.ROADMAP,
			styles: []
		};
		var map = new $window.google.maps.Map(selector, options);
		return map;
	};

	return Map;
});
