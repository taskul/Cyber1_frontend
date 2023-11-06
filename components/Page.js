import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

// Page component is like a main style/render set up for all of the pages
// Page includes Header component which contains Logo, search bar and NavBar

// any styles we want globally applied
const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Aldrich-Regular';
        src: url('/static/Aldrich-Regular.ttf');
        font-weight: normal;
        font-style: normal;
    }

    html {
        --yellow: #E5D283;
        --black: #393939;
        --blackBg: #001524;
        --lightBlue: #5cd2e6;
        --red: #EA1179;
        --offWhite: #c4c4c4;
        --maxWidth: 1000px;
        --boxShadow: 0 12px 24px 0 rgba(0,0,0,0.1);
        --boxShadowYellow: 0 12px 24px 0 rgba(229, 210, 131,0.25);
        --boxShadowBlue: 0 12px 24px 0 rgba(92, 210, 230 ,0.25);
        box-sizing: border-box;
        /* 62.5% is equivalent to 10px, but setting it up with % allows user to override this value in their browser setttings */
        font-size: 62.5%;
    }
    /* This will make sure that when we add padding and border to an element it takes away from the size instead of growing it */
    *, *::before, *:after {
        box-sizing: inherit;
    }

    body {
        font-family: 'Aldrich-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
    }

    a,
    .Nav-link {
        position: relative;
        display: inline-block;
        text-decoration: none;
        color: var(--lightBlue, #5cd2e6);
        cursor: pointer;
    }
    .Nav-link::before,
    .Nav-link::after {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        border-bottom: 1px dashed var(--yellow, #E5D283);
        transform: scaleX(0);
        transition: transform 0.25s;
    }

    .Nav-link::before {
        top: 5px;
        transform-origin: left;
    }

    .Nav-link::after {
        bottom: 5px;
        transform-origin: right;
    }

    .Nav-link:hover::before,
    .Nav-link:hover::after,
    .active::before,
    .active::after {
        transform: scaleX(1);
    }

    * {
  scrollbar-width: thin;
  scrollbar-color: #E5D283 yellow;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  display: none;
  background: 001524;
  border-radius: 10px;
  background: #252D3A;
  border: 1px solid #252D3A;
}

*::-webkit-scrollbar-thumb {
  background-color: #E5D283;
  border-radius: 20px;
  border: 3px solid #E5D283;
}


    /* font on the body does not apply to buttons and input fields so we have to specify that explicitly */
    button, input {
        font-family: 'Aldrich-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

// this is for styling children components of the Page component
const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
  color: var(--offWhite, #c4c4c4);
`;

export default function Page({ children }) {
  return (
    <div>
      {/* Keep this as self closing component, don't wrap it around the rest of the components because that breaks the code */}
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}
// propTypes type for children
// this way we have it so it either expects an array of nodes or a single node, if we just do an array or just single node we'll get errors if what we pass in does not match the type
// Page.propTypes = {
//   children: PropTypes.oneOf([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]),
// };
// this will accept anything we pass to propTypes
Page.propTypes = {
  children: PropTypes.any,
};

// how to do a prop type for if we were passing in salary as a number
// Page.prototype = {
//     salary: PropTypes.number,
// }
