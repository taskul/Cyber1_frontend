import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

// redeemUserPasswordResetToken is part of Keystone API
const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      #   Data we are requesting to get back
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  // custom error checker
  const anotherErrorHandler = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    // adding catch at the end will prevent browser console from displaying error messsages that related to this, because we are rendering below errors with useMutation, but then signup() also returns the same errors, so we also need to catch those.
    const res = await reset().catch(console.error);
    resetForm();
    // Send the email and password to the graphqlAPI
  }

  return (
    // specifying the method as post prevent our from from posting user password into request string queries
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <Error error={error || anotherErrorHandler} />
      <fieldset>
        {/* sendUserPasswordResetLink returns null when mutation is used with Keystone */}
        {data?.redeemUserPasswordResetToken === null && <p>Success!</p>}

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="password"
              value={inputs.password}
              onChange={handleChange}
            />
          </label>
        </label>
        <button type="submit">Send a Reset Password Request</button>
      </fieldset>
    </Form>
  );
}
