
const hasRole = (roles) => {

    return (req, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                message: "User is required to validate rol.",
            });
        }

        if (!roles.includes(req.user.rol)) {
            return res.status(400).json({
                msg: `This action requires roles: ${roles}`,
            });
        }

        next();
    };
};

module.exports = {
    hasRole
}