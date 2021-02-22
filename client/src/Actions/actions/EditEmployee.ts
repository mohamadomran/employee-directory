import { Dispatch } from 'react';
import { AxiosResponse } from 'axios';
import { history } from 'History/history';
import api from 'API';
import { EmployeesActionTypes } from 'Actions/actionTypes';
import { ThunkResult } from '../actionTypes';
import { Employee } from 'Reducers';

interface EditEmployee {
  type: EmployeesActionTypes.EDIT_EMPLOYEE;
}

interface EditEmployeeSuccess {
  type: EmployeesActionTypes.EDIT_EMPLOYEE_SUCCESS;
  payload: Employee;
}

interface EditEmployeeFail {
  type: EmployeesActionTypes.EDIT_EMPLOYEE_FAIL;
}

export const editEmployee = (
  editedEmployee: Employee,
): ThunkResult<void> => async dispatch => {
  handleEditEmployee(dispatch);
  try {
    const response: AxiosResponse<Employee> = await api.patch(
      `/employees/${editedEmployee.id}`,
      editedEmployee,
    );
    handleEditEmployeeSuccess(dispatch, response.data);
  } catch (e) {
    handleEditEmployeeFail(dispatch);
  }
};

const handleEditEmployee = (dispatch: Dispatch<EditEmployee>): void => {
  dispatch({ type: EmployeesActionTypes.EDIT_EMPLOYEE });
};

const handleEditEmployeeSuccess = (
  dispatch: Dispatch<EditEmployeeSuccess>,
  editedEmployee: Employee,
) => {
  dispatch({
    type: EmployeesActionTypes.EDIT_EMPLOYEE_SUCCESS,
    payload: editedEmployee,
  });
  history.push('/');
};

const handleEditEmployeeFail = (dispatch: Dispatch<EditEmployeeFail>) => {
  dispatch({ type: EmployeesActionTypes.EDIT_EMPLOYEE_FAIL });
};

export type EditEmployeeActions =
  | EditEmployee
  | EditEmployeeSuccess
  | EditEmployeeFail;
