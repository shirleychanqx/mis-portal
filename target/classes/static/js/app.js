'use strict';

angular.module('misApp',['ngRoute']).config(function($routeProvider){
	$routeProvider
	.when('/', {
        templateUrl : '/views/home.html',
        controller  : 'loginController'
    })
    .when('/views/news', {
        templateUrl : '/views/news.html',
        controller  : 'newsController'
    })
    .when('/views/news/:id', {
        templateUrl : '/views/news_detail.html',
        controller  : 'newsDetailController'
    })
    ;
    
    
});

