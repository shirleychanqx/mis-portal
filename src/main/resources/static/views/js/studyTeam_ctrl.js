'use strict';

angular.module('misApp').controller('studyTeamController', function($scope,$http,$window,$location) {
	console.log("start to load study team data");
	var baseUrl = "http://" + $location.host() + ":8080" + "/admins/";
	$http.get(baseUrl + "studyTeam/main/")
	  .success(function (response) {
		  console.log("get main team successful.");
		  $scope.mainTeam = response.studyTeam.teamGroupName;
		  var teamId = response.studyTeam.id;
		  //  load members of main team
		  $http.get(baseUrl + "user/members/" + teamId)
		  .success(function (response) {
			  console.log("get member of main team successful.");
			  $scope.mainMembers = response.list;
			  //  load members of main team
			  
		  });
	  });
	
	$http.get(baseUrl + "studyTeam/other/")
	  .success(function (response) {
		  console.log("get other team successful.");
		  $scope.otherTeams = response.list;
		  var teams = response.list;
		  
	  });
	
	
	$scope.studyTeam_remove = function(id) {
		$http.delete(baseUrl + id)
		.success(function (){
			var ctx = "/admins/";
			$location.path(ctx + 'studyTeam'); 
		});
	};
	
	$scope.studyTeam_edit = function(id) {
		var ctx = "/admins/";
		$location.path(ctx + 'studyTeam/' + id); 
	};
	
	$scope.studyTeam_add = function() {
		var ctx = "/admins/";
		$location.path(ctx + 'studyTeam/add'); 
	};
});

angular.module('misApp').controller('studyTeamAddController', function($scope,$http,$routeParams,$location) {
	var id = $routeParams.id;
	var baseUrl = "http://" + $location.host() + ":" + $location.port() + "/admins/studyTeam/" + id;
	if(typeof(id) != "undefined") {
		$scope.id = id;
		$http.get(baseUrl)
		.success(function (response) {
			$scope.id = response.studyTeam.id;
			$scope.desc = response.studyTeam.desc;
			$scope.studyDirection = response.studyTeam.studyDirection;
			$scope.subjectsTask = response.studyTeam.subjectsTask;
			$scope.relativeArticles = response.studyTeam.relativeArticles;
			$scope.type = response.studyTeam.type;
			$scope.teamGroupName = response.studyTeam.teamGroupName;
		});
	}
	
	$scope.studyTeam_list = function(){
		var ctx = "/admins/";
		$location.path(ctx + 'studyTeam'); 
	};
	
	$scope.studyTeam_save = function(){
		var id = $scope.id;
		var baseUrl = "http://" + $location.host() + ":" + $location.port() + "/admins/studyTeam/";
		if (typeof(id) == "undefined") { 
			var data = {};
			data.id = $scope.id;
			data.desc = $scope.desc;
			data.studyDirection = $scope.studyDirection;
			data.subjectsTask = $scope.subjectsTask;
			data.relativeArticles = $scope.relativeArticles;
			data.type = $scope.type;
			data.teamGroupName = $scope.teamGroupName;
			$http.post(baseUrl , data)
			.success(function (){
				var ctx = "/admins/";
				$location.path(ctx + 'studyTeam'); 
			});
		}else{
			var data = {};
			data.id = $scope.id;
			data.desc = $scope.desc;
			data.studyDirection = $scope.studyDirection;
			data.subjectsTask = $scope.subjectsTask;
			data.relativeArticles = $scope.relativeArticles;
			data.type = $scope.type;
			data.teamGroupName = $scope.teamGroupName;
			baseUrl = baseUrl + id
			$http.put(baseUrl, data)
			.success(function (){
				var ctx = "/admins/";
				$location.path(ctx + 'studyTeam'); 
			});
		}
		
	};
});
