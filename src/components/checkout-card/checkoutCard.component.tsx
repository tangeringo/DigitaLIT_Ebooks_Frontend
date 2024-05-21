import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { CheckoutCardProps, StripeTypes } from '../../globalTypes';
import { react_public_key } from "../../variables";

import PaymentForm from "../payment-form/paymentForm.component";
import { white } from "../../styles/colors.styles";


const reactEnvKey: string = (process.env.REACT_PUBLISHABLE_KEY as string) ?? react_public_key;
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

export default CheckoutCard;