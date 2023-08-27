const jwt = require('jsonwebtoken');


class Guards{
    async authGuard(token){
        return jwt.verify(token)
    }
}

module.exports = new Guards()