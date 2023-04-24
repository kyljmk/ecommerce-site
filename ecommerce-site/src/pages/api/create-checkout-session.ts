import {Request, Response} from "express"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async (req: Request, res: Response) => {
    const {items, email } = req.body

    console.log(items)
    console.log(email)
}