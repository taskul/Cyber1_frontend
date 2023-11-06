import Head from 'next/head';
import UpdateProduct from '../components/UpdateProduct';
import PleaseSignIn from '../components/PleaseSignIn';

export default function UpdatePage({ query }) {
  return (
    <div>
      <Head>
        <title>Cyber-1 update items</title>
      </Head>
      <PleaseSignIn>
        <UpdateProduct id={query.id} />
      </PleaseSignIn>
    </div>
  );
}
