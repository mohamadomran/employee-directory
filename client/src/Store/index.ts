import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { employeesReducer, EmployeesState } from 'Reducers';
import { EmployeeAction } from 'Actions';

export interface RootState {
  readonly data: EmployeesState;
}

const rootReducer = combineReducers<RootState>({
  data: employeesReducer,
});

export type RootActions = EmployeeAction;

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>),
  ),
);

export type AppState = ReturnType<typeof rootReducer>;
