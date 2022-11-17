const {User} = require("../models")
const {verify} = require("jsonwebtoken")

module.exports = async function authc(req, res, next) {
    try {
        const { access_token } = req.headers
        const checkToken = verify(access_token, process.env.JWT_TOKEN)
        const user = await User.findByPk(checkToken.id);
        if (!user) throw { name: "Unauthorized" };
        req.user = { id: user.id };
        next()
    } catch (e) {
        next(e)
    }
}