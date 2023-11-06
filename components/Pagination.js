import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationSytles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);

  return (
    // we add this to components we want to find by data-testid for testing
    <PaginationSytles data-testid="pagination">
      <Head>
        <title>
          Cyber-1 - Page {page} of {pageCount}
        </title>
      </Head>
      {/* we can't pass attributes to Next.js Link component so the work around is add <a> nested in the Link component and then add attributes to that <a> tag 
         now we can make the "prev" link disabled when we are on the first page
      */}

      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>&#8656; Prev</a>
      </Link>
      <p>
        {/* data-testid="pageCount" added for react testing so we could find this section in HTML */}
        Page {page} of <span data-testid="pageCount">{pageCount}</span>
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next &#8658;</a>
      </Link>
    </PaginationSytles>
  );
}
