module.exports = function errorHandler(err, req, res, next) {
    let code = 500
    let message = "Internal Server Error"

    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        code = 400
        message = err.errors[0].message
    } else if (err.name === "invalid_token") {
        code = 401
        message = "Invalid token"
    } else if (err.name === "invalid_email/pass") {
        code = 401
        message = "Invalid Email or Password"
    } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
        code = 401
        message = "Invalid token"
    } else if (err.name === "Unauthorized") {
        code = 401
        message = "Unauthorized"
    } else if (err.name === "forbidden") {
        code = 403
        message = "Forbidden"
    } else if (err.name === "minimum_amount") {
        code = 401
        message = "Minimum Rp 10.000,00"
    } else if (err.name === "maximum_amount") {
        code = 401
        message = "Maximum balance Rp 10.000.000,00"
    }

    res.status(code).json({ message })
}