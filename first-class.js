const http = require('http')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer()

server.listen(8200)

let users = []

server.on('request', (req, res) => {
    const parseUrl = url.parse(req.url, true)
    if (parseUrl.path.indexOf('/user') === -1) {
        res.status = 403
        res.end(`${res.status} not allowed`)
        return
    }
    switch (req.method) {
        case 'GET':
            if (parseUrl.path.indexOf('/user/') > -1) {
                let userName = parseUrl.path.substring(6, parseUrl.path.length)
                let user = users.find(u => u.name === username)
                res.statusCode = 200
                res.end(JSON.stringify(user))
            }
            let query = parseUrl.query
            if (query.age) {
                let result = users.filter(u => u.age === query.age)
                res.end(JSON.stringify(result))
            }
            res.statusCode = 200
            res.end(JSON.stringify(users))
            break
        case 'POST':
            let user = ''
            req.on('data', (buffer) => {
                const userStr = buffer.toString()
                let contentType = req.headers['content-type']
                if (contentType === "application/json") {
                    user = JSON.parse(userStr)
                    users.push(user)
                    res.statusCode = 201
                }
            })
            req.on('end', () => {
                res.statusCode = 201
                res.end('user saved')
            })
            break
        case 'PATCH':
            let userName = parseUrl.path.substring(6, parseUrl.path.length)
            console.log(userName)
            if (userName === "") {
                res.statusCode = 403
                res.end(`${res.statusCode} forbidden`)
                return
            }
            req.on('data', (buffer) => {
                let userStr = buffer.toString()
                let contentType = req.headers['content-type']
                if (contentType === "application/json") {
                    let update = JSON.parse(userStr)
                    let user = users.find(u => u.name === userName)
                    user.age = update.age
                }
            })
            req.on('end', () => {
                res.statusCode = 201
                res.end('user set changed')
            })
            break
        case 'DELETE':
            if (parseUrl.path.indexOf('/user/') > -1) {
                let userName = parseUrl.path.substring(6, parseUrl.path.length)
                let index = users.findIndex(u => u.name === userName)
                users.splice(index, 1)
                res.statusCode = 200
                res.end(`user ${userName} deleted`)
                break
            }
    }
})