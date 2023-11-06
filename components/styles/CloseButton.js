import styled from 'styled-components';

const CloseButton = styled.button`
  background: var(--red, #ea1179);
  color: white;
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 0;
  cursor: pointer;
`;

export default CloseButton;
