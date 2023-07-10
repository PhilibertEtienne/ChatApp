const { User } = require('../models')

module.exports = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll()

        return users
      } catch (err) {
        console.log(err)
      }
    },
  },
  Mutation: {
    register:async (_,args,context,info ) => {
      const {username,email,password,confirmPassword} = args
      try  {
        //TODO: validate input data

        //TODO: check if username already exists

        //TODO: create user 
        const user = await User.create({
          username, email, password
        })
        //TODO: return created user
      } catch (err) {
        console.log(err)
        throw err
      }
  }
}
}