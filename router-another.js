const router = require('express').Router()

router.use('/', (req, res, next) => {
    res.json({ code: 0, msg: 'another-router' })
})
module.exports = router