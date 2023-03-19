const CustomerRepository = require('../repository/sequelize/CustomerRepo');
const authUtils = require('../utils/authUtils')

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    CustomerRepository.findByEmail(email)
        .then(cus => {
            if(!cus) {
                res.render('index',{
                    navLocation:'',
                    loginError:"Invalid email address or password"
                })
            }else if(authUtils.comparePasswords(password, cus.password) === true){
                req.session.loggedUser = cus;
                res.redirect('/')
            }else{
                res.render('index', {
                    navLocation:'',
                    loginError: "Invalid email address or password"
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/')
}