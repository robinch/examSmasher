/**
 * SubscriptionController
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getSubscriptions: function (req, res) {
		console.log("getSub:", req.param());
		Subscription.find({
			user: req.param('userId')
		})
		.populate("course")
		.exec(function (err, courses) {
			if (err) {
				console.log(err);
				return res.negotiate(err);
			}

			console.log("COURSES: " , courses);
			return res.json(courses);
		})
	},

	addSubscription: function (req, res) {
		Subscription.findOrCreate({
			course: req.param('courseId'),
			user: req.param('userId')
		})
		.exec(function (err, subscription) {
			if (err) {
				return res.negotiate(err);
			}
			return res.json(subscription);
		})
	},

	deleteSub: function (req, res) {
		console.log("del user: ", req.param('userId'), " course: ", req.param('courseId'));
		Subscription.destroy({
			course: req.param('courseId'),
			user: req.param('userId')
		}).exec(function(err, deleted){
			if(err) {
				console.log(err);
				return res.negotiate(err);
			}

			return res.json(deleted);
		})
	},
};

