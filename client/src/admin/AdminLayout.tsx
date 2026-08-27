import { NavLink, Outlet } from "react-router-dom";
import { useAdminAuth } from "./AuthContext";
import {
  Coffee,
  LayoutDashboard,
  Package,
  MessageSquare,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const NAV_ITEMS = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/commodities", icon: Package, label: "Commodities" },
  { to: "/admin/contacts", icon: MessageSquare, label: "Contact Submissions" },
  { to: "/admin/content", icon: FileText, label: "Site Content" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[oklch(0.16_0.02_145)] text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-accent text-accent-foreground grid place-items-center flex-shrink-0">
            <Coffee className="w-5 h-5" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="font-display font-bold text-sm leading-tight">BCS Coffee</p>
              <p className="text-[10px] uppercase tracking-wider text-white/50">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div className="border-t border-white/10 p-3 space-y-2">
          {sidebarOpen && admin && (
            <div className="px-3 py-2">
              <p className="text-sm font-medium truncate">{admin.name}</p>
              <p className="text-xs text-white/50 truncate">{admin.email}</p>
            </div>
          )}
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur-md border-b border-border flex items-center px-6 gap-4">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-cream transition"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft
              className={`w-5 h-5 text-muted-foreground transition-transform ${
                sidebarOpen ? "" : "rotate-180"
              }`}
            />
          </button>

          <div className="flex-1" />

          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-1"
          >
            ← Back to site
          </Link>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
