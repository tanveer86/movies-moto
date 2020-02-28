module.exports = function(request, response, next) {
    if(!request.admin.superAdmin) return response.json('user is not super admin');
    next();
}