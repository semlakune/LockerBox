const { User, Locker, UserLocker } = require("../models")
const { sign } = require("jsonwebtoken")
const { compareSync } = require("bcryptjs")
const Sequelize = require('sequelize');
const {gt} = Sequelize.Op;

class Controller {
    static async register(req, res, next) {
        try {
            const { fullName, email, password } = req.body
            const createUser = await User.create({ fullName, email, password, balance: 0 })
            const payload = { id: createUser.id }
            const access_token = sign(payload, process.env.JWT_TOKEN)
            res.status(201).json({ access_token })
        } catch (e) {
            next(e)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            const checkEmail = await User.findOne({ where: { email: email } })
            if (!checkEmail) throw { name: "invalid_email/pass" }
            const checkPass = compareSync(password, checkEmail.password)
            if (!checkPass) throw { name: "invalid_email/pass" }

            const payload = { id: checkEmail.id }
            const access_token = sign(payload, process.env.JWT_TOKEN)
            res.status(200).json({ access_token })
        } catch (e) {
            next(e)
        }
    }

    static async getUserDetail(req, res, next) {
        try {
            const { id } = req.user
            const user = await User.findByPk(id, {
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt"]
                }
            })
            res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }

    static async getLockers(req, res, next) {
        try {
            const lockers = await Locker.findAll({ where: { isAvailable: true } })
            res.status(200).json(lockers)
        } catch (e) {
            next(e)
        }
    }

    static async getUserLockers(req, res, next) {
        const { id } = req.user
        try {
            const userLockers = await UserLocker.findAll({ where: { dayCount: { [gt]: 0 }, UserId: id } })
            res.status(200).json(userLockers)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    static async topUp(req, res, next) {
        try {
            const { id } = req.user
            const { amount } = req.body

            if (+amount < 10000) throw { name: "minimum_amount" }

            const user = await User.findByPk(id)
            const finalBalance = +user.balance + Number(amount)

            if (finalBalance > 10000000) throw { name: "maximum_amount" }

            await User.update({ balance: +finalBalance }, {where: {id: id}})
            res.status(200).json({ message: "topup success" })
        } catch (e) {
            next(e)
        }
    }

    static async getCart(req, res, next) {
        try {
            const { id } = req.user
            const cart = await UserLocker.findAll({where:{UserId: id, password: null}, include: [Locker]})
            res.status(200).json(cart)
        } catch (e) {
            next(e)
        }
    }

    static async addCart(req, res, next) {
        try {
            const { id } = req.user
            const { lockerId } = req.params
            await UserLocker.create({
                UserId: id,
                LockerId: lockerId,
            })
            await Locker.update({ isAvailable: false }, { where: { id: lockerId, } })
            res.status(200).json({ message: "success add to cart" })
        } catch (e) {
            next(e)
        }
    }

    static async deleteCart(req, res, next) {
        try {
            const { id } = req.user
            const { lockerId } = req.params
            await UserLocker.destroy({ where: { UserId: id,
                    LockerId: lockerId, } })
            await Locker.update({ isAvailable: true }, { where: { id: lockerId, } })
            res.status(200).json({ message: "success delete item from cart" })
        } catch (e) {
            next(e)
        }
    }

}

module.exports = { Controller }