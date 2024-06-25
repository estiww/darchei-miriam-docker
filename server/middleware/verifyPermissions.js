const verifyPermissions = (requiredRoles) => {
    return (req, res, next) => {
        console.log("verifyPermissions middleware triggered");

        // Ensure user is authenticated
        if (!req.userId) {
            console.log("User is not authenticated");
            return res.status(401).json({ message: "User is not authenticated" });
        }

        // Check if the user has one of the required roles
        if (!requiredRoles.includes(req.roleId)) {
            console.log(`User with role ID ${req.roleId} does not have access`);
            return res.status(403).json({ message: "User does not have the required permissions" });
        }

        console.log(`User with role ID ${req.roleId} has access`);
        return next();
    };
}

module.exports = verifyPermissions;
