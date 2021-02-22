import { Dispatch } from 'react';
import { AxiosResponse } from 'axios';
import { ThunkResult } from '../actionTypes';
import api from 'API';

import { Employee } from 'Reducers';
import { EmployeesActionTypes } from 'Actions/actionTypes';

interface Resposnse {
  employees: Employee[];
  totalCount: number;
}

interface FetchEmployees {
  type: EmployeesActionTypes.GET_EMPLOYEES;
}

interface FetchEmployeesSuccess {
  type: EmployeesActionTypes.GET_EMPLOYEES_SUCCESS;
  payload: {
    employees: Employee[];
    totalCount: number;
  };
}

interface FetchEmployeesFail {
  type: EmployeesActionTypes.GET_EMPLOYEES_FAIL;
  isError: boolean;
}

export const fetchEmployees = (
  pageSize: number,
  pageIndex: number,
): ThunkResult<void> => async dispatch => {
  handleFetchEmployees(dispatch);
  try {
    const response: AxiosResponse<Resposnse> = await api.get(
      `/employees?pageSize=${pageSize}&pageIndex=${pageIndex}`,
    );
    handleFetchEmployeesSuccess(dispatch, response.data);
  } catch (e) {
    handleFetchEmployeesFail(dispatch);
  }
};

export const handleFetchEmployees = (dispatch: Dispatch<FetchEmployees>) => {
  dispatch({ type: EmployeesActionTypes.GET_EMPLOYEES });
};

export const handleFetchEmployeesSuccess = (
  dispatch: Dispatch<FetchEmployeesSuccess>,
  response: {
    employees: Employee[];
    totalCount: number;
  },
) => {
  dispatch({
    type: EmployeesActionTypes.GET_EMPLOYEES_SUCCESS,
    payload: response,
  });
};

export const handleFetchEmployeesFail = (
  dispatch: Dispatch<FetchEmployeesFail>,
) => {
  dispatch({
    type: EmployeesActionTypes.GET_EMPLOYEES_FAIL,
    isError: true,
  });
};

export type GetEmployeeActions =
  | FetchEmployees
  | FetchEmployeesSuccess
  | FetchEmployeesFail;
