import React from 'react';
import { useDispatch } from 'react-redux';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useToast,
} from '@chakra-ui/react';
import { Employee } from 'Reducers';
import { deleteEmployee, fetchEmployees } from 'Actions';
import { useHistory } from 'react-router-dom';

import './styles.css';

interface CustomTableProps {
  headerTitles: string[];
  data: Employee[];
  pageSize: number;
  pageIndex: number;
}

export const CustomTable: React.FC<CustomTableProps> = ({
  headerTitles,
  data,
  pageSize,
  pageIndex,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  const deleteHandler = (id: number, firstname: string, lastname: string) => {
    dispatch(deleteEmployee(id));

    toast({
      position: 'bottom',
      description: `Employee ${firstname} ${lastname} is deleted successfully`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    setTimeout(() => {
      dispatch(fetchEmployees(pageSize, pageIndex));
    }, 1000);
  };

  return (
    <Box
      m={8}
      border="2px"
      borderColor="primary.main"
      borderRadius={8}
      className="responsiveTable"
    >
      <Table variant="striped" colorScheme="blue" size="md">
        <Thead>
          <Tr>
            <Th></Th>
            {headerTitles.map(element => (
              <Th key={element}>{element}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {data.map(
            ({
              id,
              firstname,
              lastname,
              title,
              department,
              location,
              email,
            }: Employee) => (
              <Tr key={id}>
                <Td>
                  <Avatar size="md" name={`${firstname} ${lastname}`} />
                </Td>
                <Td>{firstname}</Td>
                <Td>{lastname}</Td>
                <Td>{title}</Td>
                <Td>{department}</Td>
                <Td>{location}</Td>
                <Td>
                  <a href={`mailto:${email}`}>{email}</a>
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Actions
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() =>
                          history.push({
                            pathname: `./edit-employee/${id}`,
                          })
                        }
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => deleteHandler(id, firstname, lastname)}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ),
          )}
        </Tbody>
      </Table>
    </Box>
  );
};
