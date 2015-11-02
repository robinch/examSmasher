/**
 * NoteController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function (req, res) {
		Note.create({
              name: req.param('name'),
              email: req.param('email'),
            }, function (err, newUser) {
	}
	
};

