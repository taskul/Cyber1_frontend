import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const Dot = styled.div`
  padding: 0.5rem;
  line-height: 2rem;
  min-width: 2rem;
  margin-left: 3rem;
  background: var(--yellow, #e5d283);
  color: var(--blackBg, #000);
  /* When numbers change they move within the component and using this we set all numbers to have the same width*/
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
  /* we are using these classes to create custom style and animation for the CSSTransitions we are using below */
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: transform 0.4s;
    /* when we are rotating an element we want the back face of it to be hidden so we don't see it in animation */
    backface-visibility: hidden;
  }
  /* The reason we have two styling specificaitons enter and exit is because elements switch during re-render and so we style the component that is entering and the one exiting */
  .count-enter {
    /* rotate 0.5turn is half a turn */
    box-shadow: 0 0 35px #a0a14a;
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    /* we put it on top of the new element being rendered. */
    top: 0;
    position: absolute;
    transform: rotateX(0);
    backface-visibility: hidden;
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

export default function CartCount({ count }) {
  return (
    <AnimationStyles>
      <TransitionGroup>
        {/* 
      using CSSTransition for some animations
      also 400 milliseconds for time 
      */}
        <CSSTransition
          unmountOnExit
          classNames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
}
