import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Filters {
  text: string
}

const initialState: Filters = {
  text: ''
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTextFilter: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    }
  }
})

const {actions, reducer} = filtersSlice;
export const {setTextFilter} = actions;
export default reducer;