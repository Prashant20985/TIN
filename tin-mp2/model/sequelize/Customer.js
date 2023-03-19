const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Customer = sequelize.define("Customer", {
  _Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field is required.",
      },
      len: {
        args: [2, 30],
        msg: "The field should contain between 2 and 30 characters",
      },
    },
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field is required.",
      },
      len: {
        args: [2, 30],
        msg: "The field should contain between 2 and 30 characters",
      },
    },
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field is required.",
      },
      len: {
        args: [0, 100],
        msg: "The field should contain between 0 and 100 characters",
      },
    },
  },

  phoneNumber:  {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
        notEmpty: {
            msg: "The field is required."
        },
        len: {
            args: [9,9],
            msg: "The field should contain 9 characters"
        },
    }
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false
  },

});

module.exports = Customer;
