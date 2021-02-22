import api from 'API';
import { EmployeesActionTypes } from 'Actions/actionTypes';
import { ThunkResult } from '../actionTypes';
import { AxiosResponse } from 'axios';
import { Dispatch } from 'react';
import { Employee } from 'Reducers';
import { history } from 'History/history';
import { Department, Title, Location } from 'Constants';

export interface NewEmployee {
  firstname: string;
  lastname: string;
  title: Title;
  department: Department;
  location: Location;
  email: string;
}

interface AddEmployee {
  type: EmployeesActionTypes.ADD_EMPLOYEE;
}

interface AddEmployeeSuccess {
  type: EmployeesActionTypes.ADD_EMPLOYEE_SUCCESS;
  payload: Employee;
}

interface AddEmployeeFail {
  type: EmployeesActionTypes.ADD_EMPLOYEE_FAIL;
}

export const addEmployee = (
  employee: NewEmployee,
): ThunkResult<void> => async dispatch => {
  handleAddEmployee(dispatch);
  try {
    const response: AxiosResponse<Employee> = await api.post(
      '/employees',
      employee,
    );
    handleAddEmployeeSuccess(dispatch, response.data);
  } catch (e) {
    handleAddEmployeeFail(dispatch);
  }
};

const handleAddEmployee = (dispatch: Dispatch<AddEmployee>) => {
  dispatch({ type: EmployeesActionTypes.ADD_EMPLOYEE });
};

const handleAddEmployeeSuccess = (
  dispatch: Dispatch<AddEmployeeSuccess>,
  response: Employee,
) => {
  dispatch({
    type: EmployeesActionTypes.ADD_EMPLOYEE_SUCCESS,
    payload: response,
  });
  history.push('/');
};

const handleAddEmployeeFail = (dispatch: Dispatch<AddEmployeeFail>) => {
  dispatch({ type: EmployeesActionTypes.ADD_EMPLOYEE_FAIL });
};

export type AddEmployeeActions =
  | AddEmployee
  | AddEmployeeSuccess
  | AddEmployeeFail;
