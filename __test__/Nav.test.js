// Nav is dynamic, it is different when user is signed in/signed out, and when they have items in their cart.

import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
// we need CartStateProvider because it tells us if the cart is open or closed
import { CartStateProvider } from '../lib/cartState';

// make some mocks for being logged out, logged in, and logged in with cart items
const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: null } },
  },
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem()],
        }),
      },
    },
  },
];

describe('<Nav/>', async () => {
  it('Renders and minimal nav when signed out', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={notSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    // debug();
    expect(container).toHaveTextContent('Sign In');
    expect(container).toMatchSnapshot();
    const link = screen.getByText('Sign In');
    expect(link).toHaveAttribute('href', '/signin');
    const productsLink = screen.getByText('Products');
    expect(productsLink).toHaveAttribute('href', '/products');
  });

  it.skip('renders a full nav when signed in', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('Account');
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Sign Out');
    expect(container).toHaveTextContent('My Cart');
  });

  it.skip('render the amount of items in teh cart', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocksWithCartItems}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
  });
  await screen.findByText('Account');
  expect(screen.getByText('3')).toBeInTheDocument();
});
