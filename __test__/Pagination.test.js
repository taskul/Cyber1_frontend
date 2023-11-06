import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('<Pagination />', () => {
  it('displays a loading message', () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading...');
  });
  it('renders pagination for 18 items', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    // we add this to components we want to find by data-testid, data-testid="pagination"
    await screen.findByTestId('pagination');
    // debug();
    expect(container).toHaveTextContent('Page 1 of 5');
    const pageCountSpan = screen.getByTestId('pageCount');
    // screen.debug(pageCountSpan)
    expect(pageCountSpan).toHaveTextContent('5');
    expect(container).toMatchSnapshot();
  });

  it('disables the prev page on first page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(6)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/); // this is how we pass Regex to look for a button that has Prev in it, that way we don't have to include arrow icons we have with Prev on our buttons.
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'true');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
  it('disables the next page on last page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={5} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/); // this is how we pass Regex to look for a button that has Prev in it, that way we don't have to include arrow icons we have with Prev on our buttons.
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });
  it('enables all on the middle page', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={2} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    const prevButton = screen.getByText(/Prev/);
    const nextButton = screen.getByText(/Next/);
    expect(prevButton).toHaveAttribute('aria-disabled', 'false');
    expect(nextButton).toHaveAttribute('aria-disabled', 'false');
  });
});
