/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    verifyFacebook: function (req, res) {
        var params = req.params.all();
        var token = params.token;
        var fbid = params.fbid;
        var self = this;

        sails.log(params);

        FBService.verify(fbid, token, function (user) {
            req.session.regenerate(function (err) {
                if (err) res.serverError(err);

                req.session.userId = user.id;
                req.session.eid = user.eid;
                req.session.provider = user.provider;
                req.session.name = user.name;
                req.session.user = user.toJSON();
                req.session.authenticated = true;
                var result = {user: user.toObject(), sessionID: req.session.id};
                res.json(result);
            });
        }, function (err) {
            sails.log.error("fb auth failed: ", err);
            res.serverError(err);
        });
    },
};

