import React from 'react';
import { Table as ChakraTable, TableProps } from '@chakra-ui/react';
import { Provider } from 'Utils';

export const Table: React.FC = (props: TableProps) => {
  const { className, ...rest } = props;
  const classes = `${className || ''} responsiveTable`;

  return (
    <Provider value={{}}>
      <ChakraTable {...rest} className={classes} />
    </Provider>
  );
};
