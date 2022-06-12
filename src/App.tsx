import { MainMapContainer } from './pages/MainMapContainer';
import './App.css';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainMapContainer />} />
        <Route path="/:ipDomain" element={<MainMapContainer />} />
      </Routes>
    </div>
  );
}

