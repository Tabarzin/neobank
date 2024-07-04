import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import CreditCard from './pages/CreditCard';
import AboutCard from './pages/CreditCard/CardInfo/AboutCard/AboutCard';
import Cashback from './pages/CreditCard/CardInfo/Cashback/Cashback';
import FAQ from './pages/CreditCard/CardInfo/FAQ/FAQ';
import RatesConditions from './pages/CreditCard/CardInfo/RatesConditions/RatesConditions';
import HomePage from './pages/HomePage';

const App = () => {
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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
