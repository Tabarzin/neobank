import NotFound from '@components/NotFound/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import CreditCard from './pages/CreditCard';
import AboutCard from './pages/CreditCard/CardInfo/AboutCard/AboutCard';
import Cashback from './pages/CreditCard/CardInfo/Cashback/Cashback';
import FAQ from './pages/CreditCard/CardInfo/FAQ/FAQ';
import RatesConditions from './pages/CreditCard/CardInfo/RatesConditions/RatesConditions';
import ContinuationApplication from './pages/CreditCard/ContinuationApplication/ContinuationApplication';
import Code from './pages/CreditCard/ContinuationApplication/DocumentsFormed/Code/Code';
import SignPage from './pages/CreditCard/ContinuationApplication/DocumentsFormed/SignPage/SignPage';
import PaymentSchedule from './pages/CreditCard/ContinuationApplication/PaymentSchedule/PaymentSchedule';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/card" element={<CreditCard />} />
          <Route path="/credit-card" element={<CreditCard />}>
            <Route index element={<AboutCard />} />
            <Route path="about" element={<AboutCard />} />
            <Route path="rates" element={<RatesConditions />} />
            <Route path="cashback" element={<Cashback />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
          <Route path="/loan/:id" element={<ContinuationApplication />} />
          <Route path="/loan/:applicationId/document" element={<PaymentSchedule />} />
          <Route path="/loan/:applicationId/document/sign" element={<SignPage />} />
          <Route path="/loan/:applicationId/code" element={<Code />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
