/**
 * FBService
 *
 * @description :: fb api adapter
 *
 */
var request = require('request');
const FB_VALIDATE_URL = 'https://graph.facebook.com/me?access_token=';

module.exports = {
    /**
     * Validates the user as fb user
     *
     * @param {string} fbid - The user facebook id 
     * @param {string} fbToken - Facebook access token
     * @param {function} success/failure - The callback on completion
     */
    verify: function (fbid, fbToken, success, failure) {
        request.get(FB_VALIDATE_URL + fbToken, function (err, response, body) {
            if (err || response.statusCode !== 200 || JSON.parse(body).id !== fbid) {
                failure('Validation failed'); // TODO: better err msg
            } else {
                var data = JSON.parse(body);

                userData = {
                    provider: 'facebook',
                    eid: data.id,
                    name: data.name,
                };

                var cachedUser;
                // TODO: modify to an upsert
                User.findOrCreate({provider: 'facebook', eid: data.id}, userData).then(function (userRecord) {
                    success(userRecord);
                }).catch(function (err) {
                    var error = {};
                    error.message = err.message;
                    error.code = 500;
                    failure(error);
                });
            }
        });
    },
};
