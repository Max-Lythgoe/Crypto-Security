const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          for (let i = 0; i < users.length; i++) {
            const existing = bcrypt.compareSync(password, users[i].passHash)
            if (existing) {
              let usersToReturn = {...users[i]}
              delete usersToReturn.passHash
              res.status(200).send(usersToReturn)
              // console.log(usersToReturn)
            }
        }
      }
      // const { username, firstName, lastName, email, password} = req.body
      }
      res.status(400).send("User not found.")
    
    },
    register: (req, res) => {
        console.log('Registering User')
        // console.log(req.body)
        // users.push(req.body)
        // res.status(200).send(req.body)

        const { username, firstName, lastName, email, password} = req.body

        const salt = bcrypt.genSaltSync(5)
        const passHash = bcrypt.hashSync(password, salt)

        let userObj = {
          passHash,
          username,
          firstName,
          lastName,
          email,
        }
        users.push(userObj)
        let usersToReturn = {...userObj}
        delete usersToReturn.passHash
        res.status(200).send(usersToReturn)
        console.log(userObj)
    }
    
}
