import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// this all is just a boiler plate, but we need access to it to be able to do custom HTML attributes as well as we need the ability to stick our CSS inside of the head.
export default class MyDocument extends Document {
  // what all this does is taking whatever the page had to initially get adn then adding on all of the gathered CSS.

  // getInitialProps will wait until that method has been resolved before it sends the data off from the server to the browser. This should speed up rendering of the components
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    // collectStyles() will go through every component that needs to be rendered out to the page, and it will see if tehre's any style components in those components. It will take CSS that it needs and render it out to the server.
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      // we don't need lang here but it's an example showing that we can add HTML attributes
      <Html lang="en">
        {/* Here we can add and edit head tag */}
        <Head />
        <body style={{ background: 'var(--blackBg, #001524)' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
