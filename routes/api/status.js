const express = require('express')

const router = express.Router()

// const middleware = (req, res, next) => {
//   console.log("tenho acesso a toda req ", req)

//   // res.status(401).send("Faça Login!")

//   next()
// }

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date().toISOString()
  })
}
)

module.exports = router