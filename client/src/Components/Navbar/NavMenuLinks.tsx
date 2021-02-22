import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

interface NavMenuLinksProps {
  isOpen: boolean;
}

export const NavMenuLinks: React.FC<NavMenuLinksProps> = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
      flexBasis={{ base: '100%', md: 'auto' }}
    >
      <Flex
        direction={['column', 'row']}
        align="center"
        justify={['space-around', 'space-between']}
        w="100%"
        bg="transparent"
        color="white"
      >
        <Link href="/">
          <Text fontSize={['xl', '3xl']} color="white">
            Employee Directory
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};
