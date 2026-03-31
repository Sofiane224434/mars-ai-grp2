// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import JuryLayout from './layouts/JuryLayout.jsx';

// Pages Publiques
import Home from './pages/public/Home.jsx';
import Movies from './pages/public/Movies.jsx';
import Awards from './pages/public/Awards.jsx';
import About from './pages/public/About.jsx';
import FAQ from './pages/public/FAQ.jsx';
import Auth from './pages/public/Auth.jsx';
import Error from './pages/public/Error.jsx';

// Pages Dashboard
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
import MovieDetail from './pages/dashboard/jury/MovieDetail.jsx';

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
      </Route>

      {/* Route Auth sans Header/Footer */}
      <Route path="/auth" element={<Auth />} />

      {/* Admin Panel Routes avec HeaderAdmin */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard/adminpanel" element={<AdminPanel />} />
        <Route path="/dashboard/adminpanel/editsite" element={<EditSite />} />
        <Route path="/dashboard/adminpanel/invitejury" element={<InviteJury />} />
        <Route path="/dashboard/movies" element={<AdminMovies />} />
      </Route>

      {/* Jury Routes avec HeaderJury */}
      <Route element={<JuryLayout />}>
        <Route path="/dashboard/jury/:id" element={<JuryPanel />} />
        <Route path="/dashboard/jury/:id/movies" element={<JuryMovies />} />
        <Route path="/dashboard/jury/:id/movies/:movieId" element={<MovieDetail />} />
        <Route path="/dashboard/validation" element={<Validation />} />
        <Route path="/dashboard/top50" element={<Top50 />} />
        <Route path="/dashboard/top5" element={<Top5 />} />
        <Route path="/dashboard/options" element={<Options />} />
      </Route>


      {/* Page d'erreur */}
      <Route path="/error" element={<Error />} />

      {/* Route par défaut */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;