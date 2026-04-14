import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PresentationPage from './pages/PresentationPage';
import GuiddeFlowPrototype from './pages/GuiddeFlowPrototype';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Navigate to="/presentation" replace />} />
        <Route path="/presentation" element={<PresentationPage />} />
        <Route path="/flow"         element={<GuiddeFlowPrototype />} />
      </Routes>
    </BrowserRouter>
  );
}
