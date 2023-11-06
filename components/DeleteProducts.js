import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// our mutation named DELETE_PRODUCT_MUTATION takes an id of a type ID that is required !
// it will return id and name after deletion
const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// Apollo has a really nice API called Evict, and it basically just takes the deleted item out of the cache, react then will notice the change and re-render taking that item out.
// the way that this works is we create an update function that we pass along with our useMutation
// we have two arguments cache which gives us access to Apllo cache, and payload which is what useMutation returns, in our case it is "id" and "name"
function update(cache, payload) {
  // here we don't have reference to the item so the way we find it is by using cache.identify. since data.deleteProduct returns an ID we then can find that item using the ID passed in
  // if we console.log(payload) we'll find data object in there
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: { id },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      style={{ cursor: 'pointer' }}
      onClick={() => {
        // we'll use browser native confirmation, if user confirms then delete the item
        if (confirm('Are you sure you want to delete this item?')) {
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {/* the reason we put children in there is because it is a flexible button
      that will accept any text we place in it. */}
      {children}
    </button>
  );
}
