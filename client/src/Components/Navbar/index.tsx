import React from 'react';
import { NavBarContainer } from './NavbarContainer';
import { NavMenuToggle } from './NavMenuToggle';
import { NavMenuLinks } from './NavMenuLinks';

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer>
      <NavMenuToggle toggle={toggle} isOpen={isOpen} />
      <NavMenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};
