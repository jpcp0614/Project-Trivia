import { LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  const { name, email } = action.payload;
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name,
      email,
    };
  default:
    return state;
  }
};

export default loginReducer;
