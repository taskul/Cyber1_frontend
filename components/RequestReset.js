import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

// sendUserPasswordResetLink is part of Keystone API
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      #   Data we are requesting to get back
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [signup, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    // adding catch at the end will prevent browser console from displaying error messsages that related to this, because we are rendering below errors with useMutation, but then signup() also returns the same errors, so we also need to catch those.
    const res = await signup().catch(console.error);
    resetForm();
    // Send the email and password to the graphqlAPI
  }

  return (
    // specifying the method as post prevent our from from posting user password into request string queries
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <Error error={error} />
      <fieldset>
        {/* sendUserPasswordResetLink returns null when mutation is used with Keystone */}
        {data?.sendUserPasswordResetLink === null && (
          <p>Reset password email was sent!</p>
        )}

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
        </label>
        <button type="submit">Send a Reset Password Request</button>
      </fieldset>
    </Form>
  );
}

export { REQUEST_RESET_MUTATION };
