import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

// tag template literal
// we are defining our CSS in this JavaScript component and we'll define our CSS withing componets to make it easier to find everything related to each component
// because Logo component wraps around <Link> component we can edit it's CSS by editing <a> tag shown below
// so we can easily change CSS of descendants of the component
const Logo = styled.h1`
  position: relative;
  margin-left: 2rem;
  background: var(--blackBg, #001524);
  border: 2px solid var(--yellow, yellow);
  font-size: 4rem;
  z-index: 2;
  transform: skew(-7deg);
  transition: background-color 1s, box-shadow 1s;
  :hover {
    background-color: var(--yellow, yellow);
    box-shadow: 0 0 5px #a0a14a, 0 0 10px #a0a14a, 0 0 25px #a0a14a,
      0 0 200px #a0a14a;
    -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  }
  a {
    color: black;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    -webkit-text-stroke: 0.1px #5cd2e6;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    /* we'll define a --yellow variable, also fall back yellow is used as a second argument in case --yellow is not working */
    border-bottom: 1px solid var(--yellow, yellow);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--yellow, yellow);
  }
`;

function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}

// This is our header that renders NavBar, logo and search bar
export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        {/* Instead of this being an <h1> it is a Logo component that we created above */}
        <Logo>
          <Link href="/">Cyber-1</Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <ClientOnly>
          <Search>Search</Search>
        </ClientOnly>
      </div>
      <Cart />
    </HeaderStyles>
  );
}
