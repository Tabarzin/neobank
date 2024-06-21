import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import CreditCard from './pages/CreditCard';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/card" element={<CreditCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
