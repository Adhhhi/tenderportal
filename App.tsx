import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TendersList from './pages/TendersList';
import TenderDetails from './pages/TenderDetails';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotificationsPage from './pages/Notifications';
import Support from './pages/Support';
import AdminDashboard from './pages/AdminDashboard';
import CreateTender from './pages/admin/CreateTender';
import EditTender from './pages/admin/EditTender';
import BidEvaluation from './pages/admin/BidEvaluation';
import AuditLogs from './pages/admin/AuditLogs';
import ManageAdmins from './pages/admin/ManageAdmins';
import BidsList from './pages/admin/BidsList';
import VendorsList from './pages/admin/VendorsList';
import BidActionCenter from './pages/admin/BidActionCenter';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Preloader from './components/common/Preloader';

// Protected Route Component
function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { user, profile, loading, isAdmin } = useAuth();

  if (loading) return (
    <div className="flex-1 flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;

  return <>{children}</>;
}

function Footer() {
  const { language, t } = useLanguage();
  
  const getPortName = () => {
    switch(language) {
      case 'kn': return 'ನವ ಮಂಗಳೂರು ಬಂದರು ಪ್ರಾಧಿಕಾರ';
      case 'hi': return 'नव मंगलूर पत्तन प्राधिकरण';
      case 'ml': return 'ന്യൂ ಮംഗലാപുരം പോർട്ട് അതോറിറ്റി';
      default: return 'New Mangalore Port Authority';
    }
  };

  return (
    <footer className="bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 py-5 sm:py-6 border-t border-slate-200 dark:border-slate-800/60 transition-colors duration-200 mt-auto shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-200">{getPortName()}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">© 2026 NMPA. {t('footer.rights')} | {t('footer.certified')}</p>
      </div>
    </footer>
  );
}

function AppContent() {
  const { loading } = useAuth();

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="app-preloader" />}
      </AnimatePresence>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col">
        <div className="w-full flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tenders" element={<TendersList />} />
              <Route path="/tenders/:id" element={<TenderDetails />} />
              <Route path="/contact" element={<Support />} />
              
              {/* Authenticated Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/tenders/new" element={
                <ProtectedRoute adminOnly>
                  <CreateTender />
                </ProtectedRoute>
              } />
              <Route path="/admin/tenders/:id/edit" element={
                <ProtectedRoute adminOnly>
                  <EditTender />
                </ProtectedRoute>
              } />
              <Route path="/admin/tenders/:id/evaluate" element={
                <ProtectedRoute adminOnly>
                  <BidEvaluation />
                </ProtectedRoute>
              } />
              <Route path="/admin/bids" element={
                <ProtectedRoute adminOnly>
                  <BidsList />
                </ProtectedRoute>
              } />
              <Route path="/admin/bid-action-center" element={
                <ProtectedRoute adminOnly>
                  <BidActionCenter />
                </ProtectedRoute>
              } />
              <Route path="/admin/vendors" element={
                <ProtectedRoute adminOnly>
                  <VendorsList />
                </ProtectedRoute>
              } />
              <Route path="/admin/audit-logs" element={
                <ProtectedRoute adminOnly>
                  <AuditLogs />
                </ProtectedRoute>
              } />
              <Route path="/admin/manage-admins" element={
                <ProtectedRoute adminOnly>
                  <ManageAdmins />
                </ProtectedRoute>
              } />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}


