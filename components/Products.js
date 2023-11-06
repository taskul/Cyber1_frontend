import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';
// gql will take our string and turn it into a proper graphQL query
export const ALL_PRODUCTS_QUERY = gql`
  # skip is how many items are skipped, so if it is 10, then 0-10 will be skipped and we'll see items starting from 11
  # first is how many items per page we need to pass
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  // useQuery is an Apollo client hook. we can pass our query to it, it can also take a second argument to send variables along too, but we don't have any right now.
  // useQuery will return data to us, any errors and if it is currently loading.
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      // then we subtract perPage because we want the lower end of it
      // 1 * 4 - 4 = 0, skip 0 or none. 2 * 4 - 4 = 4, skip 4 start at 5th item
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  if (loading) return <p>LOADING...</p>;
  if (error) return <DisplayError error={error.message} />;
  return (
    <div>
      <ProductsListStyles>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
