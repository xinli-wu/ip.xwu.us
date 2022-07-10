import { MainMapContainer } from './pages/MainMapContainer';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Toastify } from './components/Toastify';

export default function App() {
  return (
    <div className="App">
      <Toastify />
      <Routes>
        <Route path="/" element={<MainMapContainer />} />
        <Route path="/:ipDomain" element={<MainMapContainer />} />
      </Routes>
    </div>
  );
}
