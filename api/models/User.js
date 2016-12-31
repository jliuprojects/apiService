/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    autoCreatedAt: 'created_at',
    autoUpdatedAt: 'updated_at',
    attributes: {
        provider: {type: "string", enum: ["twitter", "facebook", "foursquare", "email"]},
        eid: {type: "string"},
        name: {type:"string"},
    }
};

