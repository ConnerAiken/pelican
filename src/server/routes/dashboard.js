import express from 'express'

import { verifyJWT_MW } from '../middlewares'

const router = express.Router()

/*
  See: https://medium.com/@patrykcieszkowski/jwt-authentication-in-express-js-ee898b87a60
  R0UTES
*/

router.all('*', verifyJWT_MW)

router.get('/', (req, res) =>
{
  res.status(200)
    .json({
      success: true,
      data: "Super secret data!"
    })
})

export default router