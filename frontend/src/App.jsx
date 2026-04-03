// App.jsx
import { Routes, Route, Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
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
import YoutubeUploadTest from './pages/public/YoutubeUploadTest.jsx';

// Pages Dashboard Admin
import AdminPanel from './pages/dashboard/admin/AdminPanel.jsx';
import EditSite from './pages/dashboard/admin/EditSite.jsx';
import InviteJury from './pages/dashboard/admin/InviteJury.jsx';
import AdminMovies from './pages/dashboard/admin/AdminMovies.jsx';
import AdminEmailConfirmation from './pages/dashboard/admin/AdminEmailConfirmation.jsx';

// Pages Dashboard Jury
import JuryPanel from './pages/dashboard/jury/JuryPanel.jsx';
import JuryMovies from './pages/dashboard/jury/JuryMovies.jsx';
import MovieDetail from './pages/dashboard/jury/MovieDetail.jsx';

const getStoredUser = () => {
  try {
    const rawUser = localStorage.getItem('user');
    return rawUser ? JSON.parse(rawUser) : null;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

function AdminGuard() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (user.status !== 'admin') {
    return <Navigate to="/error" replace />;
  }

  return <Outlet />;
}

function JuryGuard() {
  const location = useLocation();
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const user = getStoredUser();

  if (!token || !user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (user.status !== 'jury') {
    return <Navigate to="/error" replace />;
  }

  if (id && String(user.id) !== String(id)) {
    return <Navigate to={`/dashboard/jury/${user.id}`} replace />;
  }

  return <Outlet />;
}

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
        <Route path="/youtube-upload-test" element={<YoutubeUploadTest />} />
      </Route>

      {/* Route Auth sans Header/Footer */}
      <Route path="/auth" element={<Auth />} />

      {/* Admin Panel Routes avec HeaderAdmin */}
      <Route element={<AdminGuard />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard/admin" element={<AdminPanel />} />
          <Route path="/dashboard/admin/edit-site" element={<EditSite />} />
          <Route path="/dashboard/admin/invite-jury" element={<InviteJury />} />
          <Route path="/dashboard/admin/movies" element={<AdminMovies />} />
          <Route path="/dashboard/admin/email-confirmation" element={<AdminEmailConfirmation />} />
          <Route path="/dashboard/admin/movies" element={<AdminMovies />} />
        </Route>
      </Route>

      {/* Jury Routes avec HeaderJury */}
      <Route element={<JuryGuard />}>
        <Route element={<JuryLayout />}>
          <Route path="/dashboard/jury/:id" element={<JuryPanel />} />
          <Route path="/dashboard/jury/:id/movies" element={<JuryMovies />} />
          <Route path="/dashboard/jury/:id/movies/:movieId" element={<MovieDetail />} />
        </Route>
      </Route>


      {/* Page d'erreur */}
      <Route path="/error" element={<Error />} />

      {/* Route par défaut */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;