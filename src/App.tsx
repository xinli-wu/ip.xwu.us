import { Map } from './pages/Map';
import './App.css';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/:ipDomain" element={<Map />} />
      </Routes>
    </div>
  );
}

