import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <HomePage />
      </div>
    </BrowserRouter>
  );
};

export default App;
