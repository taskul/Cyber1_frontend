// because in products route we have an index.js file that is automatically imported as if we stated that explicitly import ProductPage from './products/index';
import ProductPage from './products';

export default function IndexPage() {
  return <ProductPage />;
}
