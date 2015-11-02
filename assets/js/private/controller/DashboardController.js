angular.module('DashboardModule').controller('DashboardController', ["$scope", "$http", function($scope, $http) {

	$scope.me = window.SAILS_LOCALS.me;

	$scope.currentCourse;

	$scope.notes = [];

	$http.get('/fetchAll', {})
		.then(
			function(res) {
				console.log(res);
				$scope.courses = res.data;
			},
			function(error) {
				console.log(error);
				return;
			})


	// Add a course
	$scope.submitSidebarFormAdd = function() {
		var newCourse = {
			courseId: $scope.sidebar.courseId,
			name: $scope.sidebar.name
		};

		console.log("Add/find course: ", newCourse);

		$http.post('/addCourse', newCourse)
			.then(function() {

				$scope.currentCourse = newCourse;
				$scope.courses.push(newCourse);
				$scope.openCourse(newCourse);

			})
			.catch(function(sailsResponse) {
				console.log(sailsResponse);
				return;
			});

	};



	$scope.openCourse = function(course) {
		console.log(course);
		$scope.currentCourse = course;
		$http.get('/getNotes', course)
			.then(function(res) {
				//$scope.notes res.data.notes;
				console.log("NOTES FROM DB: " ,res.data);
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	$scope.addNote = function() {
		// Submit request to Sails.
		var newNote = {
			coursId: $scope.currentCourse.courseId,
			userId: $scope.me.id,
			text: $scope.formNotesText,
		};

		$scope.notes.push(newNote);
		$http.put('/addNote', newNote)
		    .then(function onSuccess (){
		      // Refresh the page now that we've been logged in.
		      $scope.notes.push(newNote.text);
		    })
		    .catch(function (err) {
				console.log(err)
		    })		
	};
}
]);