const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Person = require('./models/Person')


passport.use(new LocalStrategy(async (username, password, done) => {
    //authentication logic here
    try {
    //   console.log('Received credentials: ', username, password)
      const user = await Person.findOne({ username: username })
      if (!user)
        return done(null, false, { message: 'Incorrect Username' })
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Incorrect Password' })
      }
    } catch (error) {
      return done(error)
    }
  }))

  
  module.exports=passport;
  