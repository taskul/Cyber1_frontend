import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import { useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import SickButton from './styles/SickButton';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);

function CheckOutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  // when we declare this it needs to have access to Elements provider, which is why we are wrapping whole CheckOutForm in the Elements component below
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphqlError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      // after user buys something, here we refetch the user which would also pull user cart information which would be empty at this point.
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    // 1 stop form from submiting and turn the loader on
    e.preventDefault();
    setLoading(true);
    // 2 start page transition
    nProgress.start();
    // 3 create a payment method via stripe (Token combacks here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      // it knows to render out only one card element, so we don't need to use ref
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // 4 handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return; // stops the checkout from happening
    }
    // 5 send token from step 3 to our keystone server via a custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log('Finished with the order');
    console.log('ORDER', order);
    // 6 change the pate to view the order
    // we are rerouting user to page /order and passing a query string with it
    router.push({
      // we specify that pathname will look for variable id which will be populated by query string we are providing. This is a Next.js way to passing variables
      pathname: '/order/[id]',
      query: { id: order.data.checkout.id },
    });
    // 7 close the cart
    closeCart();
    // 8 turn the loader off
    setLoading(false);
    nProgress.done();
  }
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 16, color: 'red' }}>{error.message}</p>}
      {graphqlError && (
        <p style={{ fontSize: 16, color: 'red' }}>{graphqlError.message}</p>
      )}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

function CheckOut() {
  return (
    <Elements stripe={stripeLib}>
      <CheckOutForm />
    </Elements>
  );
}

export default CheckOut;
