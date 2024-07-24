// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ApplicationState {
//   id: string | null;
// }

// const initialState: ApplicationState = {
//   id: null,
// };

// const loanApplicationContinuationSlice = createSlice({
//   name: 'application',
//   initialState,
//   reducers: {
//     setApplicationId: (state, action: PayloadAction<string>) => {
//       state.id = action.payload;
//     },
//   },
// });

// export const { setApplicationId } = loanApplicationContinuationSlice.actions;
// export default loanApplicationContinuationSlice.reducer;

import { ContinuationFormData } from '@App/pages/CreditCard/ContinuationApplication/ContinuationApplication';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ApplicationState {
//   id: string | null;
//   formData: FormData | null;
// }

// const initialState: ApplicationState = {
//   id: null,
//   formData: null,
// };

// const loanApplicationContinuationSlice = createSlice({
//   name: 'application',
//   initialState,
//   reducers: {
//     setApplicationId: (state, action: PayloadAction<string>) => {
//       state.id = action.payload;
//     },
//     setFormData: (state, action: PayloadAction<FormData>) => {
//       state.formData = action.payload;
//     },
//   },
// });

// export const { setApplicationId, setFormData } = loanApplicationContinuationSlice.actions;
// export default loanApplicationContinuationSlice.reducer;

interface ApplicationState {
  id: string | null;
  formData: ContinuationFormData | null;
}

const loadState = (): ApplicationState => {
  try {
    const serializedState = localStorage.getItem('loanApplicationContinuationState');
    if (serializedState === null) {
      return { id: null, formData: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state:', err);
    return { id: null, formData: null };
  }
};

const initialState: ApplicationState = loadState();

const loanApplicationContinuationSlice = createSlice({
  name: 'applicationContinuation',
  initialState,
  reducers: {
    setApplicationId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setFormData: (state, action: PayloadAction<ContinuationFormData>) => {
      state.formData = action.payload;
    },
    resetState: (state) => {
      state.id = null;
      state.formData = null;
      localStorage.removeItem('loanApplicationContinuationState');
    },
  },
});

export const { setApplicationId, setFormData, resetState } = loanApplicationContinuationSlice.actions;
export default loanApplicationContinuationSlice.reducer;
