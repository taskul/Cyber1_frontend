import { gql, useQuery } from '@apollo/client';

// the reason we are using authenticated item and not user is because Keystone makes it sort of agnostic as to waht this thing is called. When we set up our schema, we told it to use user as the authenticated item, but it could be authenticated company, etc.
// we can not query User field on type AuthenticatedItem
// it returns a union, and union means it could return multiple types of values, and in out case it could return user.
export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;
export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
