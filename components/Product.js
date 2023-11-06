import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProducts';
import AddToCart from './AddToCart';

export default function Product({ product }) {
  return (
    <ItemStyles>
      {/* Javascript optional chaining parameter ?
      product?.photo?.image? question mark at the end checks if that item exists, does product exist, does photo exist, does image exist */}
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>

      {/* This is another way to do your URLs in Next.Js, and the way we can access the ID is via the query on the page. */}
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit &#128393;
        </Link>
        <AddToCart id={product.id} />
        <DeleteProduct id={product.id}>Delete &#128465;</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
