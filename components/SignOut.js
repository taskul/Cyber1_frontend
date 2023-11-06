import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut({ children }) {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button
      type="button"
      onClick={signout}
      style={{ color: 'var(--lightBlue, #5cd2e6)' }}
    >
      Sign Out
    </button>
  );
}
