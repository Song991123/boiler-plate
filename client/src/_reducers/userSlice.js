import {createSlice} from '@reduxjs/toolkit';
import { loginUser, registerUser, auth } from '../_actions/user_action';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        loginSuccess: null,
        register: null,
        userData: null,
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loginSuccess = action.payload;
                state.loading = 'idle';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.register = action.payload;
                state.loading = 'idle';
            })
            .addCase(auth.fulfilled, (state, action) => {
                state.userData = action.payload;
                state.loading = 'idle';
            })
            .addMatcher(action => action.type.endsWith('/pending'), state => {
                state.loading = 'loading';
            })
            .addMatcher(action => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            });
    }
});

export default userSlice.reducer;