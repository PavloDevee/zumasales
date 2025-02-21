import './App.css';
import Create from './pages/Create';
import Inspections from './pages/Inspections';
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { MyDataProvider } from './providers/DataProvider';
import ProtectedRoute from './route/ProtectedRoute';
import AdminPanel from './pages/admin/AdminPanel';
import { Role } from './providers/types';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';

function App() {
  return (
    <MyDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inspections" element={<ProtectedRoute element={<Inspections />} />} />
          <Route path="/inspections/create" element={<ProtectedRoute element={<Create />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} allowedRoles={[Role.Admin, Role.Moderator]} />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </MyDataProvider>
  );
}

export default App;
