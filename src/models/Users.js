const mongoose = require("mongoose"),
  bcrypt = require("bcryptjs"),
  generateToken = require("../middleware/generateToken");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      fname: {
        type: String,
        trim: true,
        required: true,
      },
      lname: {
        type: String,
        trim: true,
        required: true,
      },
    },
    address: {
      present: {
        type: String,
        trim: true,
        required: true,
      },
      permanent: {
        type: String,
        trim: true,
        required: true,
      },
    },
    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createToken = async function () {
  return generateToken(this._id);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
