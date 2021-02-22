import React from 'react';
import { Flex, Text, Spinner } from '@chakra-ui/react';

interface LoadingProps {
  text: string;
}

export const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <Flex direction="column" justify="center" align="center">
      <Text fontSize={['xl', '3xl']} color="primary.main">
        {text}
      </Text>
      <Spinner
        m={4}
        thickness="4px"
        speed="0.70s"
        emptyColor="gray.200"
        color="primary.main"
        size="xl"
      />
    </Flex>
  );
};
