import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    // refetching current user pulls up all of the info about the user including the items they have added to their cart, this is how we update the number of items in the cart.
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button
      type="button"
      disabled={loading}
      style={{ cursor: 'pointer' }}
      onClick={addToCart}
    >
      Add{loading && 'ing'} To Cart &#128092;
    </button>
  );
}
