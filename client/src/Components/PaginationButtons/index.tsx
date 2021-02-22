import React from 'react';
import { ButtonGroup, Button } from '@chakra-ui/react';

interface PaginationButtonsProps {
  page: number;
  limitReached: boolean;
  loading: boolean;
  setPage: (value: React.SetStateAction<number>) => void;
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  page,
  setPage,
  limitReached,
  loading,
}) => {
  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  return (
    <ButtonGroup size="lg" isAttached variant="outline">
      <Button mr="-px" onClick={prevPage} disabled={loading || page === 1}>
        Previous
      </Button>
      <Button mr="-px" onClick={nextPage} disabled={loading || limitReached}>
        Next
      </Button>
    </ButtonGroup>
  );
};
