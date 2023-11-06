import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';
// SINGLE_PRODUCT_QUERY takes an id that is of type ID, that is required "!"
const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    # This is a GraphQL function
    updateProduct(
      id: $id
      data: { id: $id, name: $name, description: $description, price: $price }
    ) {
      # what we are returning
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // get existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  // mutation updating the product
  // since we already declared data, error and loading above, we want to rename those variables when descructuring them fron useMutation, like this: {data: updateData, error: updateError, loading: updateLoading} = useMutation()
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      // TODO: Pass in updates to product here
    },
  });

  // we'll use our custom hook to manage form state
  // we pass in initial data for the input form from a data we gathered doing a useQuery above. We also used if (loading) show loading, because otherwise the page crushes since it can not find data.Product because it is still loading
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;
  // form to update our product
  return (
    <Form
    // TODO handle submit
    //   onSubmit={async (e) => {
    //     e.preventDefault();
    //     // submit the input fields to the backend
    //     const res = await createProduct();
    //     clearForm();
    //     // redirect to next page
    //     Router.push({
    //       pathname: `/product/${res.data.createProduct.id}`,
    //     });
    //   }}
    >
      {/* manages displaying of errors */}
      <DisplayError error={error || updateError} />
      {/* we can wrap everyting in fieldset in order to be able to disable all fields input. This way while we are sending data to server the user can't change data in input fields 
        fieldset disabled
        we have it as disabled={loading}, meaning if the form is loading, disable changing input fields
    
        however we can also use more accessible attribute aria-busy
        fieldset aria-busy which will play an animation of the loading bar above the input fields to indicate that something is happening
        aria-busy={loading} means the aria-busy animation will activte when the data is loading to backend
      */}
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="0"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
