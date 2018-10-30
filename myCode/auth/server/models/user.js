const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// define model
const userSchema = new Schema({
	email: {type: String, unique: true, lowercase: true},
	password: String
});
// on save hook, encrypt password
// before saving a model in db , run this function
userSchema.pre('save', function(next) {
	// get access to user model
	const user = this;
	// generate a salt
	bcrypt.genSalt(10, function(err, salt) {
		if(err){return next(err);}
		// hash (encrypt) passwd using the salt
		bcrypt.hash(user.password, salt, null, function(err,hash) {
			if (err){return next(err);}
			// overwrite and continue
			user.password = hash;
			next();
		});
	});
});

// create model class
const ModelClass = mongoose.model('user', userSchema);
// export model
module.exports = ModelClass;