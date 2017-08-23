const router = require('express').Router()

router.route('/')
    .get((req, res, next) => {
        res.json({ code: 0, msg: 'get method' })
        if (req.skippingFirstRouter) {
            next()
        }
    })
    .post((req, res, next) => {
        console.log('post method one')
        req.skippingFirstRouter = true;
        next()
    }), (req, res, next) => {
        res.json({ code: 0, msg: 'post method two' })
        if (req.skippingFirstRouter) {
            next()
        }
    }

module.exports = router