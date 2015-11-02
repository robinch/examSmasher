/**
 * NoteController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req, res) {
		console.log("ADD:", req.param('courseId'));
		Note.create({
			course: req.param('courseId'),
			user: req.param('userId'),
			text: req.param('text'),
			deleted: false
		}, function(err, newNote) {
			if (err) {
				console.log("err: ", err);
				return res.negotiate(err);
			}
			console.log("NEW NOTE: ", newNote)
			return res.json(
				newNote
			);
		});
	},

	getNotes: function(req, res) {
		console.log("GETNOTE: ", req.param('courseId'));
		Note.find({
				course: req.param('courseId'),
				deleted: false
			})
			.exec(function(err, course) {
				if (err) {
					console.log(err);
					return res.negotiate(err);
				}

				return res.json(course);
			})
	},

	deleteNode: function(req, res) {
		console.log("DELET NOTE: ", req.param('noteId'))
		Note.update({
				id: req.param('noteId'),
			}, {
				deleted: true
			})
			.exec(function(err, note) {
				if(err) {
					console.log(err);
					return res.negotiate(err);
				}
				return res.json(note);
			});
	}
};