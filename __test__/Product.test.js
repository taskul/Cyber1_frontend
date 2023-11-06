import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('<Product/>', () => {
  it('renders out the price tag and title', () => {
    const { container, debug } = render(
      // we use MockedProvider to fake having Apollo in our tests
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // debug shows us the html components we are rendering
    // debug();
    const priceTag = screen.getByText('$50');
    // we can debug specific html components rendered
    // debug(priceTag);
    expect(priceTag).toBeInTheDocument();
    const link = container.querySelector('a');
    // debug(link);
    expect(link).toHaveAttribute('href', '/product/abc123');
    expect(link).toHaveTextContent(product.name);
  });

  // create a snap shot of the Product HTML render, when we change Product component we need to update snapshot. When Jest is running and you get an error of snapshot does not match, press "u" to update snapshot
  it('Renders and matches the snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the image properly', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // grab the image, out alt for image is the product.name
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });
});
