import { FormInputs } from '@App/pages/CreditCard/ApplyForm/ApplyForm';
import { LoanOfferProps } from '@App/pages/CreditCard/LoanOffers/LoanOfferCard/LoanOfferCard';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoanApplicationState {
  formData: FormInputs;
  isFormValid: boolean;
  showOffers: boolean;
  showConfirmation: boolean;
  selectedOffer: LoanOfferProps | null;
}

const initialState: LoanApplicationState = {
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
  },
});

export const { updateFormData, setFormValidity, showLoanOffers, selectOffer, showConfirmation } =
  loanApplicationSlice.actions;

export default loanApplicationSlice.reducer;
