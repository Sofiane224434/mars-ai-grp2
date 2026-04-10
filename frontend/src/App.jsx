// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
function App() {
  return (
    <Routes>
      {/* Routes AVEC Header + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      {/* Routes SANS Header (plein écran) */}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
export default App;