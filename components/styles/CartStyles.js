import styled from 'styled-components';

// the way we control display of the cart if it is open or not, is we pass props to our style
const CartStyles = styled.div`
  padding: 20px;
  position: relative;
  background: var(--blackBg);
  border-left: 3px solid var(--yellow);
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  transition: all 0.3s;
  box-shadow: 0 0 15px #a0a14a;
  z-index: 5;
  color: var(--lightBlue, #5cd2e6);
  display: grid;
  grid-template-rows: auto 1fr auto;
  /* Here you can see the props.open 
    if the props.open is true then we transform translate x to zero which slides out the cart div from right to left, default fro that is listed above transform: translateX(100%); so that indicates that it is off the screen
  */
  ${(props) => props.open && `transform: translateX(0);`};
  header {
    border-bottom: 5px solid var(--black);
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 10px double var(--black);
    margin-top: 2rem;
    padding-top: 2rem;
    /* display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto 1fr auto; */
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
      color: var(--lightBlue, #5cd2e6);
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
  li {
    display: grid;
    grid-template-columns: auto 1fr auto;
    border-bottom: 1px solid var(--yellow, #e5d283);
  }
`;

export default CartStyles;
