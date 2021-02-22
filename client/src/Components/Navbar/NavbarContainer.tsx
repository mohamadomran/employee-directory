import React, { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface NavbarContainerProps {
  children: ReactNode;
}

export const NavBarContainer: React.FC<NavbarContainerProps> = ({
  children,
}) => {
  return (
    <Box as="nav" w="100%" mb={4} p={4} bg="primary.dark" color="white">
      {children}
    </Box>
  );
};
