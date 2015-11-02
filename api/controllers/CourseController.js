/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

 	add: function (req, res) {
 		Course.findOrCreate({
 			courseId: req.param('courseId'),
 			name: req.param('name')
 		},
 		function( err, newCourse){
 			if(err) {
 				console.log("err: ", err);
 				console.log("err.invalidAttributes: ", err.invalidAttributes);

                return res.negotiate(err);
 			}

 			return res.json({
 				courseId: newCourse.courseId,
 				name: newCourse.name
 			});
 		})},

 		fetchAll: function (req, res) {
 			Course.find().exec(function (err, courses){
 				if(err){
 					console.log("err: ", err);

 					//TODO add a noCourses res
 					return res.negotioate(err);
 				}

 				return res.json(courses);

 			});
 		},

 		getNotes: function (req, res) {
 			Course.find({
 				courseId: req.param('courseId')
 			})
 			.exec( function (err, course) {
 				if(err) {
 					console.log(err);
 					return res.negotioate(err);
 				}

 				return res.json(course.notes);
 			})
 		}
 };

