import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import Signup, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const me = fakeUser(); // this will create a random fake name and email
const password = '12345678';

const mocks = [
  // Mutation mock, first we specify what query we are going to make
  // our query has the same structure as the query we make with our SignUp component
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password,
      },
    },
    // then we specify the data we are going to get back
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'abc123',
          email: me.email,
          name: me.name,
        },
      },
    },
  },

  // Current user mock, we don't need to mock it since we don't automatically log the user in, but if we were then we would use this query
  //   {
  //     // This query checks if there is a user logged in already, and the result is the data that matches our fakeUser data we provided
  //     request: { query: CURRENT_USER_QUERY },
  //     result: { data: { authenticatedItem: me } },
  //   },
];

describe('<SignUp />', () => {
  it('renders and matchces snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it.skip('calls the mutation properly', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <Signup />
      </MockedProvider>
    );
    // type into the boxes
    // simulating user using the website
    // type means typing into the field, and we'll use "placeholder" as a way to find the field because that is what user would use to spot the field. Field label also would work
    await userEvent.type(screen.getByPlaceholderText('Name'), me.name);
    await userEvent.type(screen.getByPlaceholderText('Email'), me.email);
    await userEvent.type(screen.getByPlaceholderText('Password'), password);
    // debug();
    await userEvent.click(screen.getByText('Sign Up'));
    await screen.findByText(`Signed up with ${me.email}`);
    // debug();
  });
});
