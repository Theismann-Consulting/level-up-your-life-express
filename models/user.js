const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, required: true, lowercase: true, unique: true},
  password: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  avatar: String,
  googleId: String,
  facebookId: String,
  active: {
      type: Boolean,
      default: true,
  },
  score: Number,
  level: {
    type: String,
    default: "Peasant",
    enums: ["Peasant", "Artisan", "Ronan", "Samurai", "Daimyo", "Shogun", "Emperor"],
  },
},{
  timestamps: true
  });

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return next(err);
    // replace the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};

userSchema.methods.levelUp = function (user, cb) {
  console.log(user);
  if (user.score <= 150) {
    user.level = 'Peasant'
  } else if (user.score <= 300) {
    user.level = 'Artisan'
  } else if (user.score <= 450) {
    user.level = 'Ronan'
  } else if (user.score <= 600) {
    user.level = 'Samurai'
  } else if (user.score <= 750) {
    user.level = 'Daimyo'
  } else if (user.score <= 1000) {
    user.level = 'Shogun'
  } else if (user.score >= 1000) {
    user.level = 'Emperor'
  }
  return user.level;
};

module.exports = mongoose.model('User', userSchema);