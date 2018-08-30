import express from 'express' 
 
import { createJWToken } from '../libs/auth'
import { paramCheck } from '../libs/middlewares'

const router = express.Router() 
/*
  See: https://medium.com/@patrykcieszkowski/jwt-authentication-in-express-js-ee898b87a60
  ROUTES
*/  
 

router.post('*', paramCheck(['email', 'password']))

router.post('/login', (req, res) =>
{
  let { email, password } = req.body

  db.User.findByEmail(email)
  .then((user) => (!user) ? Promise.reject("User not found.") : user)
  .then((user) => user.comparePassword(password))
  .then((user) => user.publicParse(user))
  .then((user) =>
  {
    res.status(200)
      .json({
        success: true,
        token: createJWToken({
            sessionData: user,
            maxAge: 3600
          })
      })
  })
  .catch((err) =>
  {
    res.status(401)
      .json({
        message: err || "Validation failed. Given email and password aren't matching."
      })
  })
})

export default router