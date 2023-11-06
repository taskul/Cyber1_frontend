import styled from 'styled-components';

const LinkStyles = styled.ul`
  margin: 0px;
  display: flex;
  align-items: center;
  align-self: center;
  gap: 40px;
  a {
    position: relative;
    display: inline-block;
    text-decoration: none;
    color: var(--lightBlue, #5cd2e6);
    cursor: pointer;
  }
  a::before,
  a::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    border-bottom: 1px dashed var(--yellow, #e5d283);
    transform: scaleX(0);
    transition: transform 0.25s;
  }

  a::before {
    top: 5px;
    transform-origin: left;
  }

  a::after {
    bottom: 5px;
    transform-origin: right;
  }

  a:hover::before,
  a:hover::after,
  .active::before,
  .active::after {
    transform: scaleX(1);
  }
`;

export default LinkStyles;
