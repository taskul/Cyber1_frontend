import styled from 'styled-components';
import Head from 'next/head';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import RequestReset from '../components/RequestReset';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function SignInPage() {
  return (
    <GridStyles>
      <Head>
        <title>Cyber-1 SignIn/SignUp</title>
      </Head>
      <SignIn />
      <SignUp />
      <RequestReset />
    </GridStyles>
  );
}
