'use strict';

var passport = require('passport'),
    request = require('request'),
    qs = require('querystring'),
    BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy({passReqToCallback : true}, function (req, user, pwd, done) {
    if (req.session.passport && req.session.passport.user) {
        return done(null, req.session.passport.user);
    }
    request.post({
        url: 'https://www.commcarehq.org/a/swb-opphack/api/v0.4/sso/',
        form: {
            username: user,
            password: pwd
        },
        json: true
    }, function (e, r, user) {
        if (r && r.statusCode !== 200) {
            user = false;
        }
        done(e, user);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = passport;
