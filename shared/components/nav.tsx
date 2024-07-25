import { ReactNode } from 'react';

const Nav = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="flex justify-center bg-primary px-4 text-primary-foreground">{children}</nav>
  );
};

export default Nav;
