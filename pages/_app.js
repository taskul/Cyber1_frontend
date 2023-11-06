// this package helps us to implement a progress bar
// https://ricostacruz.com/nprogress/
import NProgress from 'nprogress';
// for our progress bar we'll use Router that has events that will helps us to keep track of when link starts and when it finishes the transition
// very rarely we need to hook into the router unless we want to either listen for events or programmatically change the page.
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';

// styles for progress bar from nprogress.
import 'nprogress/nprogress.css';
// that we can swap progress bar css with our own
import '../components/styles/nprogress.css';
import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
// turn off progress bar if there is an error
Router.events.on('routeChangeError', () => NProgress.done());

// here instead of children we are using prop of the app component here
// so we pass in Component, and we also need pageProps that are passed down
// even though Component and pageProps are underlined red, they are working
// apollo - where is that coming from since App is the top most component? well when we export our application, we are going to wrap it withData function, and that will give our entire application a component and it will give it to us with our data. We are wrapping it withData at the bottom of the file
function MyApp({ Component, pageProps, apollo }) {
  return (
    // give me the app but inject the Apolllo Client along inside of it.
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

// we need to fetch all of the queries that in all of the children components
// MyApp.getInitialProps is a specific Next.js thing, this is an async method that we can wait on it to do anything. We can wait on it to get fetch data frmo am API.
// ctx is context
// so what we are doing here in this code is if any of the pages have getInitialProps methods on them, which they will because that's what withData is adding to them, then we are going to just wait and fetch it. This is a boilder plate that we need to include because of how Apollo and Next.js work together.
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // this will allow us to get any query variables like ourwebsite.com/products/2 at a page level and then it will return pageProps.
  pageProps.query = ctx.query;
  return { pageProps };
};

// see whole app is wrapped with withData function.
export default withData(MyApp);
