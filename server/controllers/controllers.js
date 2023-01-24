import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';

const {STRIPE_SECRET_KEY} = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export const home = (req,res) => {
    res.status(200).json({
        "message":"success"
    })
}

export const payment = (req,res) => {

    const {product, token} = req.body;
    console.log(`Product: ${product}`);
    console.log(`Price: ${product.price}`);

    const idempotencyKey = uuidV4();
    return stripe.customers.create({
        email:token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency:'usd',
            customer: customer.id,
            receipt_email: token.email,
            description:`Purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address:{
                    country:token.card.address_country
                }
            }

        },{idempotencyKey})
        .then(result => res.status(200),json(result))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

}