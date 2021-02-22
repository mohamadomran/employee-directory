import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Text, Button, Link } from '@chakra-ui/react';
import { fetchEmployees } from 'Actions/actions/GetEmployees';

import { Loading, CustomTable, PaginationButtons } from 'Components';
import { Employee } from 'Reducers';

interface SelectorData {
  data: {
    error: string | null;
    items: {
      employees: Employee[];
      totalPages: string | null;
      totalCount: string;
    };
    loading: boolean;
  };
}

export const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const [pageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [limitReached, setLimitReached] = useState(false);

  const { loading, items } = useSelector((state: SelectorData) => state.data);

  useEffect(() => {
    dispatch(fetchEmployees(pageSize, pageIndex));
  }, [dispatch, pageSize, pageIndex]);

  useEffect(() => {
    if (items?.employees?.length < pageSize) {
      setLimitReached(true);
    } else {
      setLimitReached(false);
    }
  }, [items, pageSize]);

  const tableTitles = [
    'First Name',
    'Last Name',
    'Title',
    'Department',
    'Location',
    'Email',
  ];

  return (
    <>
      <Flex direction="column" justify="center" align="center">
        {parseInt(items?.totalCount) === 0 && (
          <Text fontSize={['xl', '3xl']} color="primary.main">
            No Employees in the Database
          </Text>
        )}
      </Flex>
      {items.totalCount && (
        <Flex
          direction={['column', 'row']}
          justify="space-between"
          align="center"
          m={8}
        >
          <Text fontSize={['xl', '2xl']} color="primary.dark" m={8}>
            Total Number of Employees: {items.totalCount}
          </Text>

          <PaginationButtons
            loading={loading}
            limitReached={limitReached}
            page={pageIndex}
            setPage={setPageIndex}
          />

          <Link href="/add-employee">
            <Button
              size="md"
              rounded="md"
              color="white"
              m={4}
              bg="primary.dark"
              _hover={{
                bg: 'primary.light',
              }}
            >
              Add New Employee
            </Button>
          </Link>
        </Flex>
      )}
      {loading && <Loading text="Loading Data..." />}

      {!loading && !items.employees && (
        <Text fontSize={['xl', '2xl']} color="primary.dark" m={8}>
          Something went wrong :/
        </Text>
      )}

      {!loading && items.employees && (
        <CustomTable
          headerTitles={tableTitles}
          data={items.employees}
          pageSize={pageSize}
          pageIndex={pageIndex}
        />
      )}
    </>
  );
};
