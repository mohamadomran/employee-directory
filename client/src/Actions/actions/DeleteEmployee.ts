import { history } from 'History/history';
import api from 'API';
import { EmployeesActionTypes } from 'Actions/actionTypes';
import { ThunkResult } from '../actionTypes';

interface DeleteEmployee {
  type: EmployeesActionTypes.DELETE_EMPLOYEE;
}

interface DeleteEmployeeSuccess {
  type: EmployeesActionTypes.DELETE_EMPLOYEE_SUCCESS;
  payload: number;
}

interface DeleteEmployeeFail {
  type: EmployeesActionTypes.DELETE_EMPLOYEE_FAIL;
}

export const deleteEmployee = (
  id: number,
): ThunkResult<void> => async dispatch => {
  dispatch({ type: EmployeesActionTypes.DELETE_EMPLOYEE });
  try {
    await api.delete(`/employees/${id}`);
    dispatch({
      type: EmployeesActionTypes.DELETE_EMPLOYEE_SUCCESS,
      payload: id,
    });

    history.push('/');
  } catch (e) {
    dispatch({ type: EmployeesActionTypes.DELETE_EMPLOYEE_FAIL });
  }
};

export type DeleteEmployeeActions =
  | DeleteEmployee
  | DeleteEmployeeSuccess
  | DeleteEmployeeFail;
