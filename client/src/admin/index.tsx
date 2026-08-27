import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAdminAuth } from "./AuthContext";
import { AdminLoginPage } from "./LoginPage";
import { AdminLayout } from "./AdminLayout";
import { DashboardPage } from "./DashboardPage";
import { CommoditiesPage } from "./CommoditiesPage";
import { ContactsPage } from "./ContactsPage";
import { ContentPage } from "./ContentPage";
import { SettingsPage } from "./SettingsPage";

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) {
    return <AdminLoginPage />;
  }

  return <>{children}</>;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminGuard>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="commodities" element={<CommoditiesPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminGuard>
    </AuthProvider>
  );
}
