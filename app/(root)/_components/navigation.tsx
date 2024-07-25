import Nav from '@/shared/components/nav';
import NavLink from '@/shared/components/nav-link';

const Navigation = () => {
  return (
    <header>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
      </Nav>
    </header>
  );
};

export default Navigation;
