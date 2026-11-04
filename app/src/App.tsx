import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/auth';
import { LoginPage } from './pages/Login';
import { HubLayout } from './layout/HubLayout';
import { OverviewPage } from './pages/Overview';
import { DocumentsPage } from './pages/Documents';
import { TasksPage } from './pages/Tasks';
import { TraceabilityPage } from './pages/Traceability';
import { DecisionsPage } from './pages/Decisions';
import { FeaturesPage } from './pages/Features';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { token, user, loadMe, loading } = useAuth();
  useEffect(() => {
    if (token && !user) loadMe();
  }, [token, user, loadMe]);
  if (!token) return <Navigate to="/login" replace />;
  if (loading || !user) return null;
  return <>{children}</>;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RequireAuth><HubLayout /></RequireAuth>}>
        <Route index element={<OverviewPage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="traceability" element={<TraceabilityPage />} />
        <Route path="decisions" element={<DecisionsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
