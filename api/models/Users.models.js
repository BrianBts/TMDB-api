const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UsersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
  },

  password: {
    type: String,
    required: true,
  },

  salt: {
    type: String,
    required: false,
    default: "",
  },

  username: {
    type: String,
    required: true,
  },

  favoriteMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
      default: [],
    },
  ],
});

UsersSchema.methods.validatePassword = async function (password) {
  try {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return this.password === hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

UsersSchema.methods.generateHash = async (password, salt) => {
  return bcrypt.hash(password, salt);
};

UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);

    this.salt = salt;
    this.password = await this.generateHash(this.password, salt);

    next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("Users", UsersSchema);
module.exports = User;
