const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy
const localLogin = new LocalStrategy({ usernameField: 'email'},function(email,password,done){
	// verify this username and password, call done with the user
	// if it is the correct username ans password
	// otherwise call done with false
	User.findOne({ email: email}, function(err,user){
		if (err) {return done(err, false);}
		if(!user) {return done(null, false);} 
		// compare passwords is password equal yto user.password
	});
});

// setup options for JWT strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// see if user ID in payload existss in our DB
	// if it does call done() with that 
	// if not call done() without a user
	User.findById(payload.sub, function(err,user){
		if (err) {return done(err, false);}
		if(user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});


// tell passport to use this strategy
passport.use(jwtLogin);