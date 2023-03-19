const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize/sequelize");

const Car = sequelize.define('Car', {
    _Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      model: {
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
    
      brand: {
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

      yearOfRelease: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "The field is required."
            },
            len: {
                args: [4,4],
                msg: "The field should contain 4 characters"
            },
        }
    },

    milage: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
          notEmpty: {
              msg: "The field is required."
          },
      }
    }
});

module.exports = Car;