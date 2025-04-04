const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const { findByEmail } = require('./../../../modules/clientes/controller-login');
const bcrypt = require('bcrypt');

const LocalStrategy = new Strategy(
    {
      usernameField: 'email',
      passwordField: 'documentNumber',
    }, async (email, password, done) => {
      try {
        const user = await findByEmail(email);
        if(!user){
            done(boom.unauthorized(), false); 
        }
        const isMatch = await bcrypt.compare(password, user.documentNumber);
        if(!isMatch){
            done(boom.unauthorized(), false);
        }
        delete user.documentNumber;
        done(null, user);
    } catch (error) {
        return done(error, false);
    }
});

module.exports = LocalStrategy;