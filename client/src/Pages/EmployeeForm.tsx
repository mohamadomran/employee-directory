/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, ButtonGroup, useToast } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import {
  InputControl,
  ResetButton,
  SelectControl,
  SubmitButton,
} from 'formik-chakra-ui';
import * as Yup from 'yup';
import {
  Title,
  Titles,
  Department,
  Departments,
  Location,
  Locations,
} from 'Constants';
import { addEmployee, editEmployee, fetchEmployee } from 'Actions';
import { Employee } from 'Reducers';
import { Loading } from 'Components';

interface SelectorData {
  data: {
    error: string | null;
    items: {
      employee: Employee;
    };
    loading: boolean;
  };
}

interface ParamTypes {
  id: string;
}

export const EmployeeForm: React.FC = () => {
  const { id } = useParams<ParamTypes>();
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();

  useSelector((state: SelectorData) => state.data);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (values: any) => {
    if (id) dispatch(editEmployee({ ...values, id }));
    else {
      dispatch(addEmployee(values));
    }

    toast({
      position: 'bottom',
      description: `Employee ${id ? 'edited' : 'created'} successfully`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setTimeout(() => {
      history.push('/');
    }, 2000);
  };

  useEffect(() => {
    dispatch(fetchEmployee(parseInt(id)));
  }, [dispatch, id]);

  const {
    loading,
    items: { employee },
  } = useSelector((state: SelectorData) => state.data);

  console.log(loading);

  const initialValues = {
    firstname: id && employee ? employee.firstname : '',
    lastname: id && employee ? employee.lastname : '',
    email: id && employee ? employee.email : '',
    title: id && employee ? employee.title : '',
    department: id && employee ? employee.department : '',
    location: id && employee ? employee.location : '',
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[a-zA-Z\s]*$/, 'Must Contain only Characters')
      .required('Required'),
    lastname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^[a-zA-Z\s']*$/, 'Must Contain only Characters')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    title: Yup.mixed<Title>().oneOf(Object.values(Title)).required('Required'),
    department: Yup.mixed<Department>()
      .oneOf(Object.values(Department))
      .required('Required'),
    location: Yup.mixed<Location>()
      .oneOf(Object.values(Location))
      .required('Required'),
  });

  return (
    <>
      {loading && <Loading text="Loading Data..." />}
      {!loading && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <Box
              borderWidth="1px"
              rounded="lg"
              shadow="1px 1px 3px rgba(0,0,0,0.3)"
              maxWidth={800}
              p={6}
              m="10px auto"
              as="form"
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              onSubmit={handleSubmit as any}
            >
              <InputControl name="firstname" label="First Name" />

              <InputControl name="lastname" label="Last Name" />

              <InputControl name="email" label="Email" />

              <SelectControl
                name="title"
                label="Title"
                selectProps={{ placeholder: 'Select Title' }}
              >
                {Titles.map(title => (
                  <option value={title} key={title}>
                    {title}
                  </option>
                ))}
              </SelectControl>
              <SelectControl
                name="department"
                label="Department"
                selectProps={{ placeholder: 'Select Department' }}
              >
                {Departments.map(department => (
                  <option value={department} key={department}>
                    {department}
                  </option>
                ))}
              </SelectControl>
              <SelectControl
                name="location"
                label="Location"
                selectProps={{ placeholder: 'Select Location' }}
              >
                {Locations.map(location => (
                  <option value={location} key={location}>
                    {location}
                  </option>
                ))}
              </SelectControl>

              <ButtonGroup>
                <SubmitButton>Submit</SubmitButton>
                <ResetButton>Clear</ResetButton>
              </ButtonGroup>
            </Box>
          )}
        </Formik>
      )}
    </>
  );
};
