// const guards = require(`${__class_dir}/guards.js`)
const jwt = require('jsonwebtoken')


class Middleware{
    async auth(req, res, next){
        try{
        const auth = req?.headers?.authorization
        const token = auth.split(' ')[1]
        if(!token) res.json({status: 401})
        const payload = await jwt.verify(token, 'secret', {
            ignoreExpiration: false
        })
        req.user = payload
        res.json(req.user)
        next()
    }catch(err){
        res.json({status:false, message:err.message})
    }
    }
}

module.exports = new Middleware()