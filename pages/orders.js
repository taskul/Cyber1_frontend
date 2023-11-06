import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import DisplayError from '../components/ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemSytles from '../components/styles/OrderItemStyles';
import PleaseSignIn from '../components/PleaseSignIn';

const USER_ORDERS_QUERY = gql`
  query {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  // we don't need to pass any variables to this query since we are pull up all of the user orders.
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { allOrders } = data;
  return (
    <div>
      <Head>
        <title>Your Orders: ({allOrders.length})</title>
      </Head>
      <PleaseSignIn>
        <h2>You have {allOrders.length} orders.</h2>
        <OrderUl>
          {allOrders.map((order) => (
            <OrderItemSytles>
              <Link href={`/order/${order.id}`}>
                <a>
                  <div className="order-meta">
                    <p>{countItemsInAnOrder(order)} items</p>
                    <p>{formatMoney(order.total)}</p>
                    <p>
                      {order.items.length} unique product
                      {order.items.length === 1 ? '' : 's'}
                    </p>
                  </div>
                  <div className="images">
                    {order.items.map((item) => (
                      <img
                        key={item.id}
                        src={item.photo?.image?.publicUrlTransformed}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </a>
              </Link>
            </OrderItemSytles>
          ))}
        </OrderUl>
      </PleaseSignIn>
    </div>
  );
}
