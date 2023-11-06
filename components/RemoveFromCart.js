import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  color: var(--red);
  border: 0;
  &:hover {
    color: var(--yellow);
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  // evict and identify are Keystone methods
  // we'll pass it deleteCartItem data because it already has all info about the item like id, type
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    // updating cart after we remove the item, we'll just remove item from cache because we already made a request to remove it from user on a server side, but we still have it cached in our local browser
    update,
    // The concept of optimistic response is it will say "Ok, I am pretty sure I know what is going to come back from the server, so what I am goign to do is immediately give you a fake response that will match what the server will give me and then if the server comes back with something different we can roll that back"
    // also for now this creates an error
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });
  return (
    <BigButton
      type="button"
      title="Remove this item from cart"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}
