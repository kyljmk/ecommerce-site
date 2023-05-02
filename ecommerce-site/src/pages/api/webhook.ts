import { buffer } from "micro"
import * as admin from "firebase-admin"
import { NextApiRequest, NextApiResponse } from "next"

const serviceAccount = require("../../permissions.json")

const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app()

export default async  (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "POST"){

    }
}