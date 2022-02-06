import { User } from "../user.model";
import * as  authActions from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state = initialState, action: authActions.AuthActions) {
  switch (action.type) {
    case authActions.LOGIN:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      };

    case authActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    case authActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case authActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };

    default:
      return state;
  }
  return state;
}

