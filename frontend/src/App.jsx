// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';

// Pages Publiques
import Home from './pages/Home.jsx';
import Movies from './pages/Movies.jsx';
import Awards from './pages/Awards.jsx';
import About from './pages/About.jsx';
import FAQ from './pages/FAQ.jsx';
import Auth from './pages/Auth.jsx';
import Error from './pages/Error.jsx';

// Pages Dashboard
import Dashboard from './pages/Dashboard.jsx';
import AdminPanel from './pages/dashboard/admin/AdminPanel.jsx';
import EditSite from './pages/dashboard/admin/EditSite.jsx';
import InviteJury from './pages/dashboard/admin/InviteJury.jsx';
import AdminMovies from './pages/dashboard/admin/Movies.jsx';
import Validation from './pages/dashboard/admin/Validation.jsx';
import Top50 from './pages/dashboard/admin/Top50.jsx';
import Top5 from './pages/dashboard/admin/Top5.jsx';
import Options from './pages/dashboard/admin/Options.jsx';
import JuryPanel from './pages/dashboard/jury/JuryPanel.jsx';
import JuryMovies from './pages/dashboard/jury/JuryMovies.jsx';

function App() {
  return (
    <Routes>
      {/* Routes PUBLIQUES avec Header + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/auth" element={<Auth />} />
      </Route>

      {/* Routes DASHBOARD avec Header uniquement */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Panel Routes */}
        <Route path="/dashboard/adminpanel" element={<AdminPanel />} />
        <Route path="/dashboard/adminpanel/editsite" element={<EditSite />} />
        <Route path="/dashboard/adminpanel/invitejury" element={<InviteJury />} />

        {/* Admin Movies & Selection */}
        <Route path="/dashboard/movies" element={<AdminMovies />} />
        <Route path="/dashboard/validation" element={<Validation />} />
        <Route path="/dashboard/top50" element={<Top50 />} />
        <Route path="/dashboard/top5" element={<Top5 />} />

        {/* Admin Options */}
        <Route path="/dashboard/options" element={<Options />} />

        {/* Jury Routes */}
        <Route path="/dashboard/jury/:id" element={<JuryPanel />} />
        <Route path="/dashboard/jury/:id/movies" element={<JuryMovies />} />
      </Route>

      {/* Page d'erreur */}
      <Route path="/error" element={<Error />} />

      {/* Route par défaut */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;