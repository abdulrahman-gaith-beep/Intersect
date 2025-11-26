import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthProvider';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import AppLayout from './components/layout/AppLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import SolutionsPage from './pages/public/SolutionsPage';
import PricingPage from './pages/public/PricingPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';

// App Pages
import Dashboard from './pages/app/Dashboard';
import Marketplace from './pages/app/Marketplace';
import DataRoom from './pages/app/DataRoom';
import Support from './pages/app/Support';
import Settings from './pages/app/Settings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            {/* Protected App Routes */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="data-room" element={<DataRoom />} />
              <Route path="support" element={<Support />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
