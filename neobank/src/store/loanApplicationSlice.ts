import { FormInputs } from '@App/pages/CreditCard/ApplyForm/ApplyForm';
import { LoanOfferProps } from '@App/pages/CreditCard/LoanOffers/LoanOfferCard/LoanOfferCard';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoanApplicationState {
  formData: FormInputs;
  isFormValid: boolean;
  showOffers: boolean;
  showConfirmation: boolean;
  selectedOffer: LoanOfferProps | null;
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
};
const initialState: LoanApplicationState = loadState();

// const loanApplicationSlice = createSlice({
//   name: 'loanApplication',
//   initialState,
//   reducers: {
//     updateFormData: (state, action: PayloadAction<Partial<FormInputs>>) => {
//       state.formData = { ...state.formData, ...action.payload };
//       saveState(state);
//     },
//     setFormValidity: (state, action: PayloadAction<boolean>) => {
//       state.isFormValid = action.payload;
//       saveState(state);
//     },
//     showLoanOffers: (state) => {
//       state.showOffers = true;
//       state.showConfirmation = false;
//       saveState(state);
//     },
//     selectOffer: (state, action: PayloadAction<LoanOfferProps>) => {
//       state.selectedOffer = action.payload;
//       saveState(state);
//     },
//     showConfirmation: (state) => {
//       state.showOffers = false;
//       state.showConfirmation = true;
//       saveState(state);
//     },
//     resetState: (state) => {
//       Object.assign(state, initialState);
//       localStorage.removeItem('loanApplicationState');
//     },
//   },
// });

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
    selectOffer: (state, action: PayloadAction<LoanOfferProps>) => {
      state.selectedOffer = action.payload;
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

export const { updateFormData, setFormValidity, showLoanOffers, selectOffer, showConfirmation, resetState } =
  loanApplicationSlice.actions;

export default loanApplicationSlice.reducer;
