import { Dispatch } from 'react';
import { AxiosResponse } from 'axios';
import api from 'API';
import { EmployeesActionTypes } from 'Actions/actionTypes';
import { ThunkResult } from '../actionTypes';
import { Employee } from 'Reducers';

interface FetchEmployee {
  type: EmployeesActionTypes.GET_EMPLOYEE;
}

interface FetchEmployeeSuccess {
  type: EmployeesActionTypes.GET_EMPLOYEE_SUCCESS;
  payload: Employee;
}

interface FetchEmployeeFail {
  type: EmployeesActionTypes.GET_EMPLOYEE_FAIL;
}

export const fetchEmployee = (
  id: number,
): ThunkResult<void> => async dispatch => {
  handleFetchEmployee(dispatch);
  try {
    const response: AxiosResponse<Employee> = await api.get(`/employees/${id}`);
    handleFetchEmployeeSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchEmployeeFail(dispatch);
  }
};

export const handleFetchEmployee = (dispatch: Dispatch<FetchEmployee>) => {
  dispatch({ type: EmployeesActionTypes.GET_EMPLOYEE });
};

const handleFetchEmployeeSuccess = (
  dispatch: Dispatch<FetchEmployeeSuccess>,
  response: Employee,
) => {
  dispatch({
    type: EmployeesActionTypes.GET_EMPLOYEE_SUCCESS,
    payload: response,
  });
};

const handleFetchEmployeeFail = (dispatch: Dispatch<FetchEmployeeFail>) => {
  dispatch({
    type: EmployeesActionTypes.GET_EMPLOYEE_FAIL,
  });
};

export type GetSingleEmployeeActions =
  | FetchEmployee
  | FetchEmployeeSuccess
  | FetchEmployeeFail;
