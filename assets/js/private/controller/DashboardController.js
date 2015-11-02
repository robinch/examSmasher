angular.module('DashboardModule').controller('DashboardController', ["$scope", "$http", function($scope, $http) {

	$scope.me = window.SAILS_LOCALS.me;

	$scope.instruction = {
		courseId: "Use the sidebar to add a course",
		name: "Do not add a note on this page, it's broken"
	}

	$scope.currentCourse = $scope.instruction;

	$scope.notes = [];

	/*$http.get('/fetchAll', {})
		.then(
			function(res) {
				$scope.courses = res.data;
			},
			function(error) {
				console.log(error);
				return;
			})
	*/

	$http.get('/getSubscriptions', {
			params: {
				userId: $scope.me.id,
			}
		})
		.then(function(res) {
				console.log("SUBS RES DB: ", res.data)
				$scope.courses = [];
				res.data.forEach(function(element) {
					console.log(element.course);
					$scope.courses.push(element.course)
				})
			},
			function(error) {
				console.log(error);
				return;
			});



	// Add a course
	$scope.submitSidebarFormAdd = function() {
		console.log("ME:", $scope.me);
		var newCourse = {
			courseId: $scope.sidebar.courseId,
			name: $scope.sidebar.name,
			userId: $scope.me.id,
		};

		console.log("Add/find course: ", newCourse);

		$http.post('/addCourse', newCourse)
			.then(function() {

				$http.post('/addSubscription', newCourse)
					.then(function() {
						$scope.courses.push(newCourse);
						$scope.openCourse(newCourse);
					})
					.catch(function(err) {
						console.log(err);
					})
			})
			.catch(function(sailsResponse) {
				console.log(sailsResponse);
				return;
			});

	};



	$scope.openCourse = function(course) {
		console.log("COURSE C: ", course);
		$scope.currentCourse = course;
		console.log("CURRENT CCOURSE ID: ", course.courseId);
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
			.then(function(res) {
				// Refresh the page now that we've been logged in.
				$scope.notes.push(res.data);
			})
			.catch(function(err) {
				console.log(err)
			})
	};

	$scope.deleteNote = function(note) {
			console.log("DASHBOARD note: ", note);
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
		};

		$scope.deleteSub = function(course) {
			console.log("DELETING sub: ", course);
			$http.delete('/deleteSub', {
					params: {
						courseId: course.courseId,
						userId: $scope.me.id
					},
				})
				.then(function(res) {
					console.log("DUDE:", res);
					for (var i = 0; i < $scope.courses.length; i++) {
						if ($scope.courses[i].courseId == course.courseId) {
							$scope.courses.splice(i, 1);
						}
					}
					$scope.currentCourse = $scope.instruction;
				});
		};
}]);