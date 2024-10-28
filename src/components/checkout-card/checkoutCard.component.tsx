import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { CheckoutCardProps, StripeTypes } from '../../data/types/types.global';

import PaymentForm from "../payment-form/paymentForm.component";
import variables from '../../data/variables/variables.static.json';


const reactEnvKey: string = (process.env.REACT_APP_PUBLISHABLE_KEY as string);
const stripePromise = loadStripe(reactEnvKey);


const CheckoutCard: React.FC<CheckoutCardProps> = ({ theme, secret }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!stripePromise || !secret) {
        navigate('/');
      }
    }, [secret, navigate])

    const options: StripeTypes = {
      clientSecret: secret,
      appearance: {
        theme: theme.background === variables.colors.white? "stripe" : "night",
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

export default CheckoutCard;