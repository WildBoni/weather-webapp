import {createSlice, PayloadAction } from '@reduxjs/toolkit';
import {useAppDispatch} from './../hooks/useRedux';
import { RootState, AppThunk } from './../store/configureStore';

interface Toast {
  text: string,
  color?: string
}

const initialState: Toast[] = [];

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    createToast: (state, action: PayloadAction<Toast>) => {
      state.push(action.payload);
    },
    removeToast: (state) => {
      state.shift();
    }
  }
})

export const addToast = (options: Toast): AppThunk => (dispatch) => {
  dispatch(createToast(options));
  setTimeout(() => {
    dispatch(removeToast())
  }, 2000);
}

const {actions, reducer} = toastsSlice;
export const {createToast, removeToast} = actions;
export default reducer

