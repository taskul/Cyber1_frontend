import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import Router from 'next/router'; // we will mock this
import wait from 'waait';
import CreateProduct, {
  CREATE_PRODUCT_MUTATION,
} from '../components/CreateProduct';
import { fakeItem, makePaginationMocksFor } from '../lib/testUtils';
import { ALL_PRODUCTS_QUERY } from '../components/Products';

const item = fakeItem();

// we are mocking out the router
// don't actually call the next router, we can't stop it from running so we mock it out
jest.mock('next/router', () => ({
  // this is creating a mock function
  push: jest.fn(),
}));

describe('<CreateProduct/>', () => {
  it('renders and matches the snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('handles the updating', async () => {
    // 1) render the form out
    const { container, debug } = render(
      <MockedProvider>
        <CreateProduct />
      </MockedProvider>
    );
    // 2) type into the boxes, we'll type item.name into a box with a placeholder of name
    await userEvent.type(screen.getByPlaceholderText('Name'), item.name);
    await userEvent.type(
      screen.getByPlaceholderText('0'),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Description/i),
      item.description
    );
    // 3) check to see if those boxes are populated
    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.price)).toBeInTheDocument();
    expect(screen.getByDisplayValue(item.description)).toBeInTheDocument();
  });

  it('creates the items when the form is submitted', async () => {
    // create the mocks for this one
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: item.name,
            description: item.description,
            image: '',
            price: item.price,
          },
        },
        result: {
          data: {
            createProduct: {
              ...item, // all fake item fields
              id: 'abc123',
              __typename: 'Item',
            },
          },
        },
      },
      {
        request: {
          query: ALL_PRODUCTS_QUERY,
          variables: { skip: 0, first: 2 },
        },
        result: {
          data: {
            allProducts: [item],
          },
        },
      },
    ];
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <CreateProduct />
      </MockedProvider>
    );

    // type into the inputs.
    await userEvent.type(screen.getByPlaceholderText('Name'), item.name);
    await userEvent.type(
      screen.getByPlaceholderText('0'),
      item.price.toString()
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Description/i),
      item.description
    );
    // submit it and see if the page has been called
    await userEvent.click(screen.getByText('Add Product'));
    console.log(Router.push);
    await waitFor(() => wait(100));
    // we take Next.js push method and we'll check if it has been called.
    expect(Router.push).toHaveBeenCalled();
    // abc123 is because that is the id of our fake item
    expect(Router.push).toHaveBeenCalledWith({ pathname: '/product/abc123' });
  });
});
