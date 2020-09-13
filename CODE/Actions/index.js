const SET_USER = 'SET_USER';
const SET_CRED = 'SET_CRED';


export const setUser = user => ({
  type: SET_USER,
  user: user
});

export const setCred = cred => ({
  type: SET_CRED,
  cred: cred
})