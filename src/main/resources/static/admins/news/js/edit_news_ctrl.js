'use strict';

angular.module('misApp',[]).controller('newsAddController', function($scope, $http, $window) {
	console.log(' start to load data');
	var basicUrl = "http://localhost:8080/news/";
	var newsId = $scope.$on('id', function(d,data) { 
        console.log(data);         //子级能得到值  
        var id = d;
        $http.get(basicUrl + id )
        .success(function (response) {
        	var vm = this;
        	this.subject = response.news.subject;
        	$scope.content = response.news.content;
        	$scope.id = response.news.id;
        });
        return id;
    });  
	console.log('id:' + newsId);   
	$scope.save = function() {
		if($scope.id == '' || angular.isUndefined($scope.id)){
			// create news
			var data = {"subject":$scope.subject,"content":$scope.content};
			$http.post(basicUrl,data)
			.success(function (){
				$window.location.href = '/admins/news/news.html';
			});
		}else{
			// update news
			var data = {"subject":$scope.subject,"content":$scope.content};
			$http.put(basicUrl + $scope.mId,data)
			.success(function (){
				$window.location.href = '/admins/news/news.html';
			});
		}
	};
	
	$scope.list = function() {
		$window.location.href = '/admins/news/news.html';
	};
});


