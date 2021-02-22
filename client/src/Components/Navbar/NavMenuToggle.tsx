import React from 'react';
import { Box } from '@chakra-ui/react';
import { MenuIcon, CloseIcon } from 'Icons';

interface NavMenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

export const NavMenuToggle: React.FC<NavMenuToggleProps> = ({
  toggle,
  isOpen,
}) => {
  return (
    <Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};
