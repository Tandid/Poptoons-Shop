const crypto = require("crypto");
const Sequelize = require("sequelize");
const db = require("../db");
const { v4: uuidv4 } = require("uuid");

const User = db.define("user", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: uuidv4,
  },
  email: {
    type: Sequelize.STRING,
    // unique: true,
    // allowNull: false,
    validate: {
      isEmail: {
        msg: "Please enter a valid email address",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue("password");
    },
    validate: {
      len: {
        args: [3],
        msg: "Password must be at least 3 characters",
      },
    },
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue("salt");
    },
  },
  googleId: {
    type: Sequelize.STRING,
  },

  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },

  firstName: {
    type: Sequelize.STRING,
    defaultValue: "",
  },

  lastName: {
    type: Sequelize.STRING,
    defaultValue: "",
  },

  address: {
    type: Sequelize.STRING,
  },

  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      "https://images-na.ssl-images-amazon.com/images/I/41vdN0vxvrL._AC_.jpg",
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password();
};

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

/**
 * hooks
 */
const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword);
});
