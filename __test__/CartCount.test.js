// updating props and re-rendering
import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount />', () => {
  it('Renders', () => {
    // we don't even need expect here because if there any sort of error that's thrown inside of cart count, the test will automatically fail.
    render(<CartCount count={10} />);
  });
  it('Matches snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });
  it('updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={11} />);
    expect(container.textContent).toBe('11');
    expect(container).toHaveTextContent('11'); // exactly the same as the last one
    // to update the props and then test the update, we will use rerender
    rerender(<CartCount count="12" />);
    // the way we have it set up with animation is that it renders 11 and then 12 and then 11 disapears creating an animation. The problem is if we run a regular test we get an error because we get '11' back
    // the fix, we need to wait
    await wait(400); // why we put 400 milliseconds in there? because that is what we have set up in  our animation.
    // const twelve = await screen.findByText('12'); // findBy methods look for what is specified multiple times before givng up, which means on the second or third look they may find 12 because at that point 11 will disapear.
    expect(container.textContent).toBe('12');
  });
});
