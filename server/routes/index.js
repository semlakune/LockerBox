const {Controller} = require("../controllers");
const router = require("express").Router()
const authc = require("../middleware/authc")

router.post("/register", Controller.register)
router.post("/login", Controller.login)

// authc
router.use(authc)
// authc

router.get("/users", Controller.getUserDetail)
router.get("/lockers", Controller.getLockers)
router.get("/userlockers", Controller.getUserLockers)
router.patch("/topups", Controller.topUp)
router.get("/carts", Controller.getCart)
router.post("/add-cart/:lockerId", Controller.addCart)
router.delete("/delete-cart/:lockerId", Controller.deleteCart)

module.exports = router