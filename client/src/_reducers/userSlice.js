import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk actions
export const loginUser = createAsyncThunk(
    'user/login',
    async (dataToSubmit, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/users/login', dataToSubmit);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/register',
    async (dataToSubmit, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/users/register', dataToSubmit);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const auth = createAsyncThunk(
    'user/auth',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get('/api/users/auth');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

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