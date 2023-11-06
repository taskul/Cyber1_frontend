import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'cat@cats.com';
const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email },
    },
    result: {
      // the way that Keystone works is that if the requst is successful we get null back
      data: { sendUserPasswordResetLink: null },
    },
  },
];

describe('<RequestReset/>', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation when submitte', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    // type into the boxes
    // simulating user using the website
    // type means typing into the field, and we'll use "placeholder" as a way to find the field because that is what user would use to spot the field. Field label also would work
    // we use Regex for email field /email/i means includes word email and is case insensitive
    userEvent.type(screen.getByPlaceholderText(/email/i), email);
    // click submit
    userEvent.click(screen.getByText(/Send a Reset Password Request/));
    const success = await screen.findByText(/Reset password email was sent!/i);
    screen.debug(success);
  });
});
