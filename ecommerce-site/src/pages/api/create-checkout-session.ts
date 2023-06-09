import { IProduct } from "@/Types"
import {Request, Response} from "express"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2022-11-15',
  })

export default async (req: Request, res: Response) => {
    const {items, email } = req.body

    const transformedItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item: IProduct) => ({

        quantity: 1,
        price_data: {
            currency: "gbp",
            product_data: {
                name: item.title,
                images: [item.image],
                description: item.description
            },
            unit_amount: item.price * 100
        }
    }))

    const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        submit_type: "pay",
        shipping_options: [{
          shipping_rate: "shr_1N0W2KKWKoO69dwVdT14k0i2"
        }],
        shipping_address_collection: {
          allowed_countries: ["GB", "US", "CA", "SE"]
        },
        payment_method_types: ['card'],
        line_items: transformedItems,
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata: {
          email,
          images: JSON.stringify(items.map((item: IProduct) => item.image))
        }
      }

    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(params)

    res.status(200).json({id: session.id})
}

