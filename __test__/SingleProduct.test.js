import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

const mocks = [
  {
    // when someone requests this query and variable combo
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: '123',
      },
    },
    // return this data
    result: {
      data: {
        Product: product,
      },
    },
  },
];
describe('<SingleProduct />', () => {
  it('renders with proper data', async () => {
    // we need to make some fake data
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <SingleProduct id="123" />
      </MockedProvider>
    );

    // wait for the test id to show up. We added
    // we added data attribute to ProductStyles in SingleProduct that has an data-testid="singleProduct"
    await screen.findByTestId('singleProduct');
    // debug();
    expect(container).toMatchSnapshot();
  });

  if (
    ('Errors out when item is not found',
    async () => {
      const errorMock = [
        {
          request: {
            query: SINGLE_ITEM_QUERY,
            variables: {
              id: '123',
            },
          },
          result: {
            errors: [{ message: 'Item not found!!!' }],
          },
        },
      ];
      const { container, debug } = render(
        <MockedProvider mocks={errorMock}>
          <SingleProduct id="123" />
        </MockedProvider>
      );
      // ErrorMessage.js ErrorStyles has data-testid="graphql-error"
      await screen.findByTestId('graphql-error');
      // debug();
      expect(container).toHaveTextContent('Shoot!');
      expect(container).toHaveTextContent('Item not found!!!');
    })
  );
});
