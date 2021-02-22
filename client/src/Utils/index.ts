import React from 'react';

const { Provider, Consumer } = React.createContext<Record<number, unknown>>({});

export { Provider, Consumer };
