const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Rent = sequelize.define("Rent", {
  _Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  pickupDate: {
    type: Sequelize.DATE,

    get() {
      return !!this.getDataValue("pickupDate")
        ? this.getDataValue("pickupDate").toISOString().split("T")[0]
        : undefined;
    },
    validate: {
      notEmpty: {
        msg: "The field is required.",
      },
    },
    allowNull: false,
  },

  returnDate: {
    type: Sequelize.DATE,

    get() {
      return !!this.getDataValue("returnDate")
        ? this.getDataValue("returnDate").toISOString().split("T")[0]
        : undefined;
    },
    validate: {
      notEmpty: {
        msg: "The field is required.",
      },
    },
    allowNull: false,
  },

  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field is required.",
      },
    },
  },

  carId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field is required.",
      },
    },
  },

  customerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field is required.",
      },
    },
  },
}); 

module.exports = Rent;
