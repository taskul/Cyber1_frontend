import SignIn from './SignIn';
import { useUser } from './User';

export default function ({ children }) {
  const me = useUser();
  if (!me) return <SignIn />;
  // else if they are signed in, render out children
  return children;
}
