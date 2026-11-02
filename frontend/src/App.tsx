import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { PricingModal } from './components/PricingModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { DashboardPage } from './pages/DashboardPage';
import { EditorPage } from './pages/EditorPage';
import { BrandKitPage } from './pages/BrandKitPage';
import { AiStudioPage } from './pages/AiStudioPage';
import { PresentationsPage } from './pages/PresentationsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { WhiteboardsPage } from './pages/WhiteboardsPage';
import { SpreadsheetsPage } from './pages/SpreadsheetsPage';
import { VideoEditorPage } from './pages/VideoEditorPage';
import { WebsitesPage } from './pages/WebsitesPage';
import { PdfToolsPage } from './pages/PdfToolsPage';
import { SocialMediaPage } from './pages/SocialMediaPage';
import { AppsPage } from './pages/AppsPage';
import { PricingPage } from './pages/PricingPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { AdminPage } from './pages/AdminPage';
import { AdminStoragePage } from './pages/AdminStoragePage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-slate-500">Loading session...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-slate-500">Verifying administrator access...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (user.role !== 'ADMIN' && user.role !== 'ROLE_ADMIN') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50 min-h-[60vh]">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Administrator Access Required</h2>
        <p className="text-slate-600 max-w-md mb-6">
          This administrative control center is restricted to authorized platform administrators. Your account (<span className="font-semibold text-slate-800">{user.email}</span>) does not have administrator privileges.
        </p>
        <a
          href="/"
          className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors"
        >
          Return to Studio Home
        </a>
      </div>
    );
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isEditor = location.pathname === '/editor';
  const isFullscreenApp = isEditor || location.pathname === '/whiteboards' || location.pathname === '/video-editor';
  const isAuthScreen = !user && (location.pathname === '/' || location.pathname === '/login');

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isInput =
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable;

      if ((e.key === 'e' && (e.ctrlKey || e.metaKey)) || (!isInput && e.key === '/')) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isFullscreenApp ? 'h-screen overflow-hidden' : 'bg-slate-50'}`}>
      {!isFullscreenApp && !isAuthScreen && (
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
      )}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          {/* Home Page: Functions as Login Page for unauthenticated guests; Canva Studio Home Hub once logged in */}
          <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />

          {/* All Design Tools Strictly Protected: Requires Authentication */}
          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <TemplatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brand-kit"
            element={
              <ProtectedRoute>
                <BrandKitPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-studio"
            element={
              <ProtectedRoute>
                <AiStudioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/presentations"
            element={
              <ProtectedRoute>
                <PresentationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <DocumentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/whiteboards"
            element={
              <ProtectedRoute>
                <WhiteboardsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/spreadsheets"
            element={
              <ProtectedRoute>
                <SpreadsheetsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video-editor"
            element={
              <ProtectedRoute>
                <VideoEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/websites"
            element={
              <ProtectedRoute>
                <WebsitesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pdf-tools"
            element={
              <ProtectedRoute>
                <PdfToolsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/social-media"
            element={
              <ProtectedRoute>
                <SocialMediaPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apps"
            element={
              <ProtectedRoute>
                <AppsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pricing"
            element={
              <ProtectedRoute>
                <PricingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <HelpCenterPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/storage"
            element={
              <AdminRoute>
                <AdminStoragePage />
              </AdminRoute>
            }
          />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <AuthModal />
      <PricingModal />
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
