'use strict';

angular.module('poseidon')
.controller('ProfileCtrl', function($scope, $state, $window, User){
  $scope.update = function(user){
		User.save(user)
		.then(function(){
			alert('Profile updated!');
		})
		.catch(function(){
			alert('Janky alert error!');
		});
	};
});
