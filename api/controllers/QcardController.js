/**
 * QcardController
 *
 * @description :: Server-side logic for managing qcards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	renderAll : function (req, res) {

		return Qcard.find()
		.then(function (cards) {
			sails.log(cards);
			res.view('qcards/all', {cards: cards});
		})
		.catch(function (err) {
			res.view('qcards/all', {cards: err});
		});
	},

	postCard : function (req, res) {
		var params = req.params.all();
		var data = {question: params.question, answer: params.answer};

		Qcard.findOrCreate(data, data).then(function (card) {
            res.view('qcards/add');
        }).catch(function (err) {
            res.error(err);
        });
	},

	add : function (req, res) {
		if (req.method == 'POST') {
			var params = req.params.all();
			var data = {question: params.question, answer: params.answer};

			Qcard.findOrCreate(data, data).then(function (card) {
	            res.view('qcards/add', {isPost: true});
	        }).catch(function (err) {
	            res.error(err);
	        });
		} else {
			res.view('qcards/add', {isPost: false});
		}
	}
};

