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
      mname: {
        type: String,
        trim: true,
      },
      lname: {
        type: String,
        trim: true,
        required: true,
      },
      suffix: {
        type: String,
        enum: {
          values: ["JR", "SR", "III", "IV", "V"],
          message: "{VALUE} is not supported",
        },
      },
    },
    role: {
      access: {
        type: String,
        enum: {
          values: ["admin", "employee", "guest"],
          message: "{VALUE} is not supported",
        },
        required: true,
      },
      name: {
        type: String,
        enum: {
          values: ["Administrator", "Employee", "Guest"],
          message: "{VALUE} is not supported",
        },
        required: true,
      },
    },
    nickname: {
      type: String,
    },
    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    dob: {
      type: String,
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
