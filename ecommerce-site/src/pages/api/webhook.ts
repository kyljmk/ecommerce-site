// import { buffer } from "micro"
// import * as admin from "firebase-admin"
// import { NextApiRequest, NextApiResponse } from "next"
// import Stripe from "stripe"

// const serviceAccount = require("../../../permissions.json")

// const app = !admin.apps.length ? admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// }) : admin.app()

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// const endpointSecret = process.env.STRIPE_SIGNING_SECRET

// const fulfillOrder = async (session: any) => {
//     return app.firestore().collection("users").doc(session.metadata.email).collection("orders").doc(session.id).set({
//            //@ts-ignore
//         amount: session.amount_total / 100,
//         //@ts-ignore
//         amount_shiping: session.total_details?.amount_shipping / 100,
//         images: JSON.parse(session.metadata.images),
//         timeStamp: admin.firestore.FieldValue.serverTimestamp()
//     }).then(() => {
//         console.log(`SUCCESS: Order ${session.id} has been added to the DB`)
//     })
// }

// export default async  (req: NextApiRequest, res: NextApiResponse) => {
//     if(req.method === "POST"){
//         const requestBuffer = await buffer(req)
//         const payload = requestBuffer.toString()
//         const sig = req.headers["stripe-signature"]

//         let event;

//         try {
//             event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
//         } catch (err: any) {
//             console.log("ERROR", err.message)
//             res.status(400).send(`Webhook error: ${err.message}`)
//         }

//         if(event.type === "checkout.session.completed") {
//             const session = event.data.object

//             return fulfillOrder(session)
//                 .then(() => res.status(200))
//                 .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`))
//         }
//     }
// }

// export const config = {
//     api: {
//         bodyParser: false,
//         externalResolver: true
//     }
// }