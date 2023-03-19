const CustomerRepository = require("../repository/sequelize/CustomerRepo");
const config = require("../config/auth/key");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  CustomerRepository.findByEmail(email).then((user) => {
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password!" });
    }

    bcrypt
      .compare(password, user.password)
      .then((isEqual) => {
        if (!isEqual) {
          return res
            .status(401)
            .send({ message: "Invalid email or password!" });
        }
        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          config.secret,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: token, userId: user._id });
      })
      .catch((err) => {
        console.log(err);
        res.status(501);
      });
  });
};
