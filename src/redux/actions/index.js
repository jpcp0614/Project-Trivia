export const LOGIN = 'LOGIN';

// export const SUCCESS = 'SUCCESS';

// export const ERROR = 'ERROR';

export const loginAction = (name, email) => ({
  type: LOGIN,
  payload: {
    name,
    email,
  },
});

// export const successActionApi = () => ({
//   type: SUCCESS,
//   payload,
// });
