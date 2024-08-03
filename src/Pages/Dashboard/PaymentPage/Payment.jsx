/* eslint-disable react/prop-types */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const Payment = ({trainer}) => {
    const stripePromiss = loadStripe('pk_test_51PVnlzHfXE3cme7oqd3RxI5HlnXUGzS4C4FTkhqhLf31I7vJlNsE8WvKRxHvVdmi1NyLLAep0O0Xh8G0eNkuGFCU00ZlQSRWlv')
    return ( 
        <Elements stripe={stripePromiss}>
            <CheckOutForm trainer={trainer} />
        </Elements>
     );
}
 
export default Payment;