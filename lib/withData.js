import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';
import paginationField from './paginationField';

function createClient({ headers, initialState }) {
  // we create a new Apollo Client
  return new ApolloClient({
    // then we insert links
    // first link is an error handling link. It takes two different types of errors that could possibly happen in your GraphQL requests - graphQLErrors, networkError.
    // some examples of error are your password is wrong or you requested a field that does not exist.
    // or you may request an image on a product and it will say did you mean images? or did you mean photos?
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );
        // the second is a network error, that would activate when the backend is down, or there is a CORS issue.
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          );
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      // this is responsible for fetching data as well as making post requests, esentially all CRUD events.
      // Inside of React, Apollo is going to give up both query and mutation hooks that will allow us to do our CRUD requests.
      createUploadLink({
        // where is the GraphQL endpoin
        uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
        // here we indicate if we should send cookies with each request, and in our case, yes we do want to send cookies in order to make sure the user is logged in, and if they are check what they are actually allowed to see (we have user roles),
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables Server Side Rendering (SSR) with logged in state
        // this allows us to render on the server side all of the logged in states.
        // we are also going to store JWT in cookies so then it can be sent to the server. Storing JWT in localStorage does not allow server to access it
        headers,
      }),
    ]),
    // where will we store the cache, and here we set it up to store it in memory.
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            // the way we get data from the queries it is already divided into pages using $skip and $first and then it is added to cache. However deleting items is hard because items don't shift on pages because of how they are caches. So we need to control how things are cached here
            allProducts: paginationField(),
          },
        },
      },
      // restore - what that does is that is because we're initially rendering these views on the server, we need to hot potato all the data that was collected on the server Apollo Clinet, and we need to give it to the hydration of the client. And this is what it's doing, it's saying if there is any initial state, then restore it, otherwise, go ahead.
    }).restore(initialState || {}),
  });
}

// getDataFromTree
// withApollo allows us to crawl all of our pages and components, and look for any queries that we have. So queries for products, users, and orders. It will wait for all that data to be fetched before the server send the HTML from the server to the Client.
export default withApollo(createClient, { getDataFromTree });
