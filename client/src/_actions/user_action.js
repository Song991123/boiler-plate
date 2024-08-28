import { createAsyncThunk } from '@reduxjs/toolkit';
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