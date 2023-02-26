import Stripe from 'stripe';
// const KEY = process.env.STRIPE_KEY
// const stripe =  Stripe(KEY);

 const stripe =  Stripe("sk_test_51K9sVxEJQYX9kbo07a5MrJAaDP0kaTGa5LEWUNlcoqH6ctWOXbwGkPbzVMvYyLHrZ4T1g2IAfx4QtCzRl96VTXGt00FlaLXque");

export const payment = (req, res, next) => {
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"usd"
    },(stripeErr,stripeRes)=>{
        if (stripeErr) {
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    })
};