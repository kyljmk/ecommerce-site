import { IProduct } from "@/Types"
import {Request, Response} from "express"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
  })

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

    const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        submit_type: 'donate',
        payment_method_types: ['card'],
        line_items: [
                    {
                      price_data: {currency: 'usd', product_data: {name: 'T-shirt'}, unit_amount: 2000},
                      quantity: 1,
                    },
                  ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/donate-with-checkout`,
      }

    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)

    res.status(200).json({id: session.id})
}


// {
//     payment_method_types: ["card"],
//     shipping_options: ["shr_1N0W2KKWKoO69dwVdT14k0i2"],
//     shipping_address_collection: {
//         allowed_countries: ["GB", "US", "CA", "SE"]
//     },
//     line_items: [
//         {
//           price: {currency: 'usd', product_data: {name: 'T-shirt'}, unit_amount: 2000},
//           quantity: 1,
//         },
//       ],
//     mode: "payment",
//     success_url: `${process.env.HOST}/success`,
//     cancel_url: `${process.env.HOST}/checkout`,
//     metadata: {
//         email,
//         images: JSON.stringify(items.map((item: IProduct) => item.image))
//     }
// }