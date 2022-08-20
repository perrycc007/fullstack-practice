const jwt = require('jsonwebtoken')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


const auth = async (req, res, next) => {
    try {
        // console.log(req.body)
        console.log(req.body.token)
        const token = req.body.token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const result = await prisma.user.findFirst({
            where: {
              email: decoded.email,
            },
          })
        console.log(result)
        // if (!result) {
        //     throw new Error()
        // }

        req.body.token = token
        req.body.email = result.email
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth