import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

// to be able to dynamically pass data to our mutation we need to give it a name in order for us to be able to reference it
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # All of this is GraphQL notation
    # which varilabe are getting passed in? and what types are they
    # ! and the end means it is required
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload!
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        # How can we create a relationship if we don't have a photo ID?
        # In keystone specifically we can do nested creates and link them as a relationship all from one query.
        # what we are saying here is create a relationship and behind the scenes also create a new item with this image and altText
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  // we'll use our custom hook to manage form state
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    image: '',
    name: '',
    price: 0,
    description: '',
  });

  // we''ll use useMutation hook
  // first argument is the actual mutation
  // seond is any data we want to pass along, in our case it is all of the values from input fields
  // The first item useMutation returns is the actual function that will run the mutation
  // the second is an object that is the same as what our query returns
  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      // because the names in the inputs match the names of the mutation query the inputs object will be descructured
      variables: inputs,
      // we import the ALL_PRODUCTS_QUERY in order to refetch all products, because when we add a new product the products page is not automatically updated since the Products page is cached and the browser just pulls up the cached version, so what we do is we refetch all of the procuts which updates the product page and will include a new produst. Otherwise user has to manually refresh the page to get all products
      // we can also pass variable to the query if we need to, but we don't have any
      //   refetchQueries: [{ query: ALL_PRODUCTS_QUERY, variables}],
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );
  // createProduct when it runs it will go off to the backend and run the mutation for us.
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit the input fields to the backend
        const res = await createProduct();
        clearForm();
        // redirect to next page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      {/* manages displaying of errors */}
      <DisplayError error={error} />
      {/* we can wrap everyting in fieldset in order to be able to disable all fields input. This way while we are sending data to server the user can't change data in input fields 
        fieldset disabled
        we have it as disabled={loading}, meaning if the form is loading, disable changing input fields
    
        however we can also use more accessible attribute aria-busy
        fieldset aria-busy which will play an animation of the loading bar above the input fields to indicate that something is happening
        aria-busy={loading} means the aria-busy animation will activte when the data is loading to backend
      */}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          {/* image doesn't need value or placeholder */}
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Add Product</button>
      </fieldset>
    </Form>
  );
}

export { CREATE_PRODUCT_MUTATION };
