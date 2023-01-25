import React,{useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
const STRIPE_KEY = process.env.REACT_APP_STRIPE_KEY;


const App = () => {
const [product,setProduct] = useState({
   name:"iPhone 14 Pro",
   price:150000,
   productBy:"Apple INC.",
   quantity:2
})

const makePayment = async (token) => {
  const body = { 
    token, 
    product
  }

  try {
    const res = await axios.post("http://localhost:5000/payment",JSON.stringify(body),{
    headers:{
         "Content-Type": "application/json" 
      }
    }) 

    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div style={{
      "display":"flex",
      "alignItems":"center",
      "justifyContent":"center",
      "height":"100vh"
    }}>
      <StripeCheckout 
      stripeKey={STRIPE_KEY}
      token={makePayment}
      name="Letsbuy Payment"
      amount={product.quantity*product.price*100}
      currency='INR'
      shippingAddress
      billingAddress
      />
    </div>
  )
}

export default App;

