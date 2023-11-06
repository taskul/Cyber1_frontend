import SingleProduct from '../../components/SingleProduct';

// to get id of the product we need to destructure query and we then get an id from that.
export default function SingleProductPage({ query }) {
  return <SingleProduct id={query.id} />;
}
