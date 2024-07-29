import { ContinuationFormData } from '@App/pages/CreditCard/ContinuationApplication/ContinuationApplication';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const saveState = (state: ApplicationState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('loanApplicationContinuationState', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

const initialState: ApplicationState = loadState();

const loanApplicationContinuationSlice = createSlice({
  name: 'applicationContinuation',
  initialState,
  reducers: {
    setApplicationId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
      saveState(state);
    },
    setFormData: (state, action: PayloadAction<ContinuationFormData>) => {
      state.formData = action.payload;
      saveState(state);
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
