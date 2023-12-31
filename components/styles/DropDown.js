import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid var(--yellow);
  background-color: black;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid var(--yellow);
  background: ${(props) => (props.highlighted ? '#393939' : '001524')};
  padding: 1rem;
  transition: all 0.2s;
  ${(props) => (props.highlighted ? 'padding-left: 2rem;' : null)};
  color: var(--lightBlue, #5cd2e6);
  display: flex;
  align-items: center;
  border-left: 10px solid
    ${(props) => (props.highlighted ? props.theme.lightgrey : '393939')};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    background-color: #001524;
    color: var(--lightBlue, #5cd2e6);
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    font-weight: bold;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
