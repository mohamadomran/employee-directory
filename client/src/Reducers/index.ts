import { Reducer } from 'redux';

import { EmployeesActionTypes, EmployeeAction } from 'Actions';
import { Department, Title, Location } from 'Constants';

export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  title: Title;
  department: Department;
  location: Location;
  email: string;
}

export interface Employees {
  [id: number]: Employee;
}

export interface EmployeesState {
  items: Employees;
  loading: boolean;
  error: string | null;
}

const initialState = {
  items: {},
  loading: false,
  error: null,
};

export const employeesReducer: Reducer<EmployeesState, EmployeeAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case EmployeesActionTypes.GET_EMPLOYEE:
    case EmployeesActionTypes.GET_EMPLOYEES:
    case EmployeesActionTypes.ADD_EMPLOYEE:
    case EmployeesActionTypes.EDIT_EMPLOYEE:
      return { ...state, loading: true };

    case EmployeesActionTypes.GET_EMPLOYEE_FAIL:
    case EmployeesActionTypes.GET_EMPLOYEES_FAIL:
    case EmployeesActionTypes.ADD_EMPLOYEE_FAIL:
      return { ...state, loading: false };

    case EmployeesActionTypes.GET_EMPLOYEE_SUCCESS:
    case EmployeesActionTypes.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        items: { ...state.items, employee: action.payload },
        loading: false,
      };

    case EmployeesActionTypes.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        items: { ...action.payload },
        loading: false,
      };

    case EmployeesActionTypes.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};
