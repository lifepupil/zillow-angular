'use strict';

angular.module('poseidon')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('about', {url: '/about', templateUrl: '/views/general/about.html'})
  .state('faq', {url: '/faq', templateUrl: '/views/general/faq.html'})
  .state('contact', {url: '/contact', templateUrl: '/views/general/contact.html'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('profile', {url: '/profile', templateUrl: '/views/users/profile.html', controller: 'ProfileCtrl'})
  
  .state('neighborhoods', {url: '/neighborhoods', templateUrl: '/views/neighborhoods/neighborhoods.html', abstract: true})
  .state('neighborhoods.new', {url: '/new', templateUrl: '/views/neighborhoods/neighborhoods-new.html', controller: 'NewNeighborhoodCtrl'})
  .state('neighborhoods.list', {url: '/', templateUrl: '/views/neighborhoods/neighborhoods-list.html', controller: 'ListNeighborhoodCtrl'})
  .state('neighborhoods.show', {url: '/{neighborhoodId}', templateUrl: '/views/neighborhoods/neighborhoods-show.html', controller: 'ShowNeighborhoodCtrl'});
});
