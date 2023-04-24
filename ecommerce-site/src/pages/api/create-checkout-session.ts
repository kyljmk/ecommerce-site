import { IProduct } from "@/Types"
import {Request, Response} from "express"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async (req: Request, res: Response) => {
    const {items, email } = req.body

    const transformedItems = items.map((item: IProduct) => ({

        quantity: 1,
        price: {
            currency: "gbp",
            product_data: {
                name: item.title,
                images: [item.image]
            },
            unit_amount: item.price * 100
        }
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_options: ["shr_1N0W2KKWKoO69dwVdT14k0i2"],
        shipping_address_collection: {
            allowed_countries: ["GB", "US", "CA", "SE"]
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item: IProduct) => item.image))
        }
    })

    res.status(200).json({id: session.id})
}