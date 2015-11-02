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

				$scope.courses.push(newCourse);
				$scope.openCourse(newCourse);

			})
			.catch(function(sailsResponse) {
				console.log(sailsResponse);
				return;
			});

	};



	$scope.openCourse = function(course) {
		$scope.currentCourse = course;
		console.log("CURRENT CCOURSE: ", course.courseId);
		$http.post('/getNotes', {
				courseId: $scope.currentCourse.courseId
			})
			.then(function(res) {
				$scope.notes = res.data;
			})
			.catch(function(err) {

			});
	};

	$scope.addNote = function() {
		// Submit request to Sails.
		var newNote = {
			courseId: $scope.currentCourse.courseId,
			userId: $scope.me.id,
			text: $scope.formNotesText,
		};
		console.log("NEW NOTE: ", newNote);

		$http.post('/addNote', newNote)
			.then(function (res) {
				$scope.notes.push(res.data);
			})
			.catch(function(err) {
				console.log(err)
			})
	};

	$scope.deleteNote = function(note) {
		console.log("DASHBOARD note: ",note);
		$http.post('deleteNote', {
				noteId: note.id
			})
			.then(function(res) {
				for (var i = 0; i < $scope.notes.length; i++) {
					if ($scope.notes[i].id == note.id) {
						$scope.notes.splice(i, 1);
					}
				}
			})
			.catch(function(err) {
				console.log(err);
			})
	}
}]);