import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPi from '../../api/userApi.js';
import Storage_keys from './../../constants/storage-keys';

//============================================================================
// define action
export const register = createAsyncThunk('users/register', async (payload, thunkAPI) => {
    //thunkAPI call action khac neu can

    //call api to register
    const data = await userAPi.register(payload);
    //save data to local
    localStorage.setItem(Storage_keys.TOKEN, data.jwt);
    localStorage.setItem(Storage_keys.USER, JSON.stringify(data.user));
    return data.user;
});

export const login = createAsyncThunk('users/login', async (payload, thunkAPI) => {
    //thunkAPI call action khac neu can

    //call api to register
    const data = await userAPi.login(payload);
    //save data to local
    localStorage.setItem(Storage_keys.TOKEN, data.jwt);
    localStorage.setItem(Storage_keys.USER, JSON.stringify(data.user));
    return data.user;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(Storage_keys.USER)) || {},
        settinge: {},
    },
    reducers: {
        logout(state) {
            //clear local storage
            localStorage.removeItem(Storage_keys.USER);
            localStorage.removeItem(Storage_keys.LOGIN);

            state.current = {};
        },
    }, // auto export to action
    extraReducers: {
        // can define action asyn
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },

        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
