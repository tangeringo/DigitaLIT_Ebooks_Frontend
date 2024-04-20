import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { REACT_PUBLISHABLE_KEY } from "../../variables";
import { CheckoutCardProps, StripeTypes } from '../../globalTypes'

import PaymentForm from "../payment-form/paymentForm.component";
import { white } from "../../styles/colors.styles";


const nodeEnv: string = (REACT_PUBLISHABLE_KEY as string);

const stripePromise = loadStripe(nodeEnv);


const CheckoutCard: React.FC<CheckoutCardProps> = ({ theme, secret }) => {
    const navigate = useNavigate();
    console.log("secret: ", secret)

    useEffect(() => {
      if (!stripePromise || !secret) {
        navigate('/');
      }
    }, [secret, navigate])

    const options: StripeTypes = {
      // pass the client secret
      clientSecret: secret,
      // Fully customizable with appearance API.
      appearance: {
        theme: theme.background === white? "stripe" : "night",
        variables: {
          colorPrimary: '#262626',
        }
      },
    };
    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
        </Elements>
    );

}

export default CheckoutCard