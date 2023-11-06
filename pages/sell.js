import Head from 'next/head';
import CreateProduct from '../components/CreateProduct';
import PleaseSignIn from '../components/PleaseSignIn';

export default function SellPage() {
  return (
    <div>
      <Head>
        <title>Cyber-1 Sell Items page</title>
      </Head>
      <PleaseSignIn>
        <CreateProduct />
      </PleaseSignIn>
    </div>
  );
}
