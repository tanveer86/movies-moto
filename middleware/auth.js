const jwt = require('jsonwebtoken');

function auth(request, response, next) {
    let token = request.header('auth-token');
    if(!token) return response.json('access denied no token provided');

    try {
        let decoded = jwt.verify(token, 'Tanveer');
        request.admin = decoded;
        next();
    } catch (error) {
        response.json('invalid token id provided')
    }
}

module.exports = auth;