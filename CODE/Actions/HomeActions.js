import { Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';
import { GET_EXPENSES, GET_INCOMES, UPDATE_AMOUNT, UPDATE_AMOUNT_INC, UPDATE_CATEGORY_SELECTED, UPDATE_CATEGORY_SELECTED_INC, DISPLAY_SUB_DETAILS, LOGOUT, SAVE_SETTINGS, SAVE_SETTINGS_INC } from './types';
import baseurl from '../../BaseUrl';

export const updateCategorySelected = (mainCategory) => {
    return {
        type: UPDATE_CATEGORY_SELECTED,
        payload: mainCategory
    }
}

export const updateCategorySelected_inc = (mainCategory) => {
    return {
        type: UPDATE_CATEGORY_SELECTED_INC,
        payload: mainCategory
    }
}


export const signOut = async (token, expenses, finishAction) => {
    console.log(expenses)

    return (dispatch) => {

        const axiosData = {
            token: token,
            expenses: expenses
        };

        const endpoint = baseurl + "/api/saveexpenses";
        axios.post(endpoint, axiosData)
            .then(response => {
                dispatch({
                    type: SAVE_SETTINGS,
                    payload: response.data
                });
            if (finishAction === 'done') {
                saveExpenseDataComplete();
            }
        })
        .catch(err => {
            console.log('error retrieving expenses: ', err);
        });
    };
};


export const saveExpenseData = (token, expenses, finishAction) => {
    console.log(expenses)

    return (dispatch) => {

        const axiosData = {
            token: token,
            expenses: expenses
        };

        const endpoint = baseurl + "/api/saveexpenses";
        axios.post(endpoint, axiosData)
            .then(response => {
                dispatch({
                    type: SAVE_SETTINGS,
                    payload: response.data
                });
            if (finishAction === 'done') {
                saveExpenseDataComplete();
            }
        })
        .catch(err => {
            console.log('error retrieving expenses: ', err);
        });
    };
};


export const saveIncomeData = (token, incomes, finishAction) => {
    console.log(incomes)

    return (dispatch) => {

        const axiosData = {
            token: token,
            incomes: incomes
        };

        const endpoint = baseurl + "/api/saveincomes";
        axios.post(endpoint, axiosData)
            .then(response => {
                dispatch({
                    type: SAVE_SETTINGS_INC,
                    payload: response.data
                });
            if (finishAction === 'done') {
                saveIncomesDataComplete();
            }
        })
        .catch(err => {
            console.log('error retrieving incomes: ', err);
        });
    };
};

const saveExpenseDataComplete= () => {
  Actions.home({type: ActionConst.RESET});
};

const saveIncomesDataComplete= () => {
    Actions.home({type: ActionConst.RESET});
};

export const getExpenseData = (token) => {
    return (dispatch) => {

        const axiosData = {
            token: token,
        };
        const endpoint = baseurl + "/api/expenses";
        axios.post(endpoint, axiosData)
            .then(response => {
                //console.log(response.data)

                dispatch({
                    type: GET_EXPENSES,
                    payload: response.data
                });
        })
        .catch(err => {
            console.log('error retrieving expenses oi: ', err);
        });
        //console.log(dispatch)

    };
};


export const getIncomeData = (token) => {
    return (dispatch) => {

        const axiosData = {
            token: token,
        };
        const endpoint = baseurl + "/api/incomes";
        axios.post(endpoint, axiosData)
            .then(response => {
                //console.log(response.data)

                dispatch({
                    type: GET_INCOMES,
                    payload: response.data
                });
        })
        .catch(err => {
            console.log('error retrieving incomes oi: ', err);
        });
        //console.log(dispatch)

    };
};


export const updateAmount = (value, mainCategory, rowId, idx, subCategoryName) => {
    return {
        type: UPDATE_AMOUNT,
        payload: {
            value: value,
            mainCategory: mainCategory,
            rowId: rowId,
            idx: idx,
            subCategoryName: subCategoryName
        }
    }
}

export const updateAmount_inc = (value, mainCategory, rowId, idx, subCategoryName) => {
    return {
        type: UPDATE_AMOUNT_INC,
        payload: {
            value: value,
            mainCategory: mainCategory,
            rowId: rowId,
            idx: idx,
            subCategoryName: subCategoryName
        }
    }
}

export const logout = () => {
    Actions.auth({type: ActionConst.RESET});
    return {
        type: LOGOUT
    }
}
