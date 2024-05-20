const createHttpError = require("http-errors");
const PermissionModel = require("../models/permission");
const RoleModel = require("../models/role");


function checkPermission(requiredPermissions = []) {
    return async function (req,res,next) {
        try {
            const user = req.user;
            console.log("user" + user);
            const role = await RoleModel.findOne({title: user.role});
            const permissions = await PermissionModel.find({_id: {$in: role.permissions}});
            const userPermission = permissions.map((item) => item.name);
            const hasPermission = requiredPermissions.every(permission => {
                return userPermission.includes(permission);
            })
            if(requiredPermissions.length == 0 || hasPermission) {
                return next();
            }
            console.log(requiredPermissions);
            console.log(userPermission);
            throw new createHttpError.Forbidden("شما به این قسمت دسترسی ندارید .")
        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = {
    checkPermission
}