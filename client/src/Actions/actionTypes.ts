import { ThunkAction } from 'redux-thunk';
import { RootState, RootActions } from 'Store';

import { GetEmployeeActions } from './actions/GetEmployees';
import { GetSingleEmployeeActions } from './actions/GetSingleEmployee';
import { AddEmployeeActions } from './actions/AddEmployee';
import { EditEmployeeActions } from './actions/EditEmployee';
import { DeleteEmployeeActions } from './actions/DeleteEmployee';

export enum EmployeesActionTypes {
  GET_EMPLOYEES = 'GET_EMPLOYEES',
  GET_EMPLOYEES_SUCCESS = 'GET_EMPLOYEES_SUCCESS',
  GET_EMPLOYEES_FAIL = 'GET_EMPLOYEES_FAIL',
  GET_EMPLOYEE = 'GET_EMPLOYEE',
  GET_EMPLOYEE_SUCCESS = 'GET_EMPLOYEE_SUCCESS',
  GET_EMPLOYEE_FAIL = 'GET_EMPLOYEE_FAIL',
  ADD_EMPLOYEE = 'ADD_EMPLOYEE',
  ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS',
  ADD_EMPLOYEE_FAIL = 'ADD_EMPLOYEE_FAIL',
  EDIT_EMPLOYEE = 'EDIT_EMPLOYEE',
  EDIT_EMPLOYEE_SUCCESS = 'EDIT_EMPLOYEE_SUCCESS',
  EDIT_EMPLOYEE_FAIL = 'EDIT_EMPLOYEE_FAIL',
  DELETE_EMPLOYEE = 'DELETE_EMPLOYEE',
  DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS',
  DELETE_EMPLOYEE_FAIL = 'DELETE_EMPLOYEE_FAIL',
}

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

export type EmployeeAction =
  | GetEmployeeActions
  | GetSingleEmployeeActions
  | AddEmployeeActions
  | EditEmployeeActions
  | DeleteEmployeeActions;
