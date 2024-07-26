import { FormInputs } from '@App/pages/CreditCard/ApplyForm/ApplyForm';
import { LoanOfferData, LoanOfferProps } from '@App/pages/CreditCard/LoanOffers/LoanOfferCard/LoanOfferCard';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoanApplicationState {
  formData: FormInputs;
  isFormValid: boolean;
  showOffers: boolean;
  showConfirmation: boolean;
  // selectedOffer: LoanOfferProps | null;
  selectedOffer: LoanOfferData | null;
  loanOffers: LoanOfferData[];
}
const loadState = (): LoanApplicationState => {
  try {
    const serializedState = localStorage.getItem('loanApplicationState');
    if (serializedState === null) {
      return defaultInitialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultInitialState;
  }
};

const saveState = (state: LoanApplicationState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('loanApplicationState', serializedState);
  } catch (err) {
    console.log(err);
  }
};
export const defaultInitialState: LoanApplicationState = {
  formData: {
    lastname: '',
    firstname: '',
    patronimic: '',
    email: '',
    birth: '',
    passport_series: '',
    passport_num: '',
    select1: '',
  },
  isFormValid: false,
  showOffers: false,
  showConfirmation: false,
  selectedOffer: null,
  loanOffers: [],
};
const initialState: LoanApplicationState = loadState();

const loanApplicationSlice = createSlice({
  name: 'loanApplication',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormInputs>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setFormValidity: (state, action: PayloadAction<boolean>) => {
      state.isFormValid = action.payload;
    },
    showLoanOffers: (state) => {
      state.showOffers = true;
      state.showConfirmation = false;
    },
    selectOffer: (state, action: PayloadAction<LoanOfferData>) => {
      state.selectedOffer = action.payload;
    },
    setLoanOffers: (state, action: PayloadAction<LoanOfferData[]>) => {
      state.loanOffers = action.payload;
    },
    showConfirmation: (state) => {
      state.showOffers = false;
      state.showConfirmation = true;
    },
    resetState: (state) => {
      Object.assign(state, defaultInitialState);
      localStorage.removeItem('loanApplicationState');
    },
  },
});

export const {
  updateFormData,
  setFormValidity,
  showLoanOffers,
  selectOffer,
  showConfirmation,
  resetState,
  setLoanOffers,
} = loanApplicationSlice.actions;

export default loanApplicationSlice.reducer;
