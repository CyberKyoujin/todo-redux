import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
        const response = await axios.get('http://127.0.0.1:8000/tasks/');
        return response.data;
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (description) => {
        const response = await axios.post('http://127.0.0.1:8000/tasks/create/', {'description': description});
        return response.data;
    }
)

export const completeTodo = createAsyncThunk(
    'todos/complete',
    async (id) => {
        const response = await axios.post(`http://127.0.0.1:8000/tasks/update/${id}/`);
        console.log(response.data);
        return response.data;
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/delete',
    async (id) => {
        const response = await axios.delete(`http://127.0.0.1:8000/tasks/delete/${id}/`)
        console.log(response.data);
        return response.data;
    }
)


const initialState = {
    todos: [],
    loading: 'idle' 
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state) => {
                state.loading = 'failed';
            })
    }
})

export default todosSlice.reducer;