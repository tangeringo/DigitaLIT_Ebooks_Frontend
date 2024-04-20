import { useState, FormEvent } from 'react';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// REPLACE WITH A BUTTON COMPONENT
import SubmitButton, { BUTTON_TYPE_CLASS } from '../submit-button/submitButton.component';

import { PaymentFormWrapper } from './paymentForm.styles';


const PaymentForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  // const [isProcessingPayment, setIsProcessingPayment ] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // setIsProcessingPayment(true);

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // redirect to route thankyou
        return_url: 'http://localhost:3000/thankyou/',  // don't have this yet
        payment_method_data: {
          billing_details: {
            phone: '7873679090',
            address: {
              line1: 'Example Building #129',
              city: 'Carolina',
              state: 'PR',
              postal_code: '00987',
              country: 'US'
            }
          }
        }
      },
    });

    // setIsProcessingPayment(false);

    if (error) {
      setErrorMessage(error.message);
    } else {}
  }


    return (
        <PaymentFormWrapper>
            <form onSubmit={paymentHandler}>
                {/* Collect More User Info */}
                <PaymentElement />
                    {errorMessage && 
                        <div className='text-pink-500 p-2 rounded-md mt-2 bold bg-pink-100'>
                            {errorMessage}
                        </div>
                    }
                <SubmitButton type='submit' buttonType={BUTTON_TYPE_CLASS.checkout}>Pay Now</SubmitButton>
            </form>
        </PaymentFormWrapper>
    )
};

export default PaymentForm;