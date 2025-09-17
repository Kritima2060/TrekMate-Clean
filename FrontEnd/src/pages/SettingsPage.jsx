import { useState } from "react";
import {
  User,
  Bell,
  SlidersHorizontal,
  Shield,
  Clock,
  LogOut,
} from "lucide-react";

 const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

const sidebarItems = [
  { id: "account", label: "Account", icon: User },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "history", label: "History", icon: Clock },
  { id: "security", label: "Security", icon: Shield },
  { id: "logout", label: "Logout", icon: LogOut },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="flex min-h-screen bg-neutral-50 text-neutral-800">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-200 bg-white p-4">
        <h2 className="text-xl font-semibold mb-6 px-2">Settings</h2>
        <nav className="space-y-1">
          {sidebarItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition 
                ${
                  activeTab === id
                    ? "bg-neutral-100 text-[#e74c3c] font-medium"
                    : "hover:bg-neutral-100"
                }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "account" && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg border border-neutral-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-neutral-300 p-3 focus:outline-none focus:ring-2 focus:ring-[#e74c3c]"
              />
              <button className="rounded-lg bg-[#e74c3c] px-4 py-2 text-white font-medium shadow hover:bg-[#c0392b] transition">
                Save Changes
              </button>
            </div>
          </section>
        )}

        {activeTab === "preferences" && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-[#e74c3c]" />
                Enable Dark Mode
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-[#e74c3c]" />
                Enable Compact Layout
              </label>
            </div>
          </section>
        )}

        {activeTab === "notifications" && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">Notifications</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-[#e74c3c]" />
                Email Notifications
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="accent-[#e74c3c]" />
                Push Notifications
              </label>
            </div>
          </section>
        )}

        {activeTab === "history" && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">History</h3>
            <p className="text-neutral-600">
              Your recent activity will appear here.
            </p>
          </section>
        )}

        {activeTab === "security" && (
          <section>
            <h3 className="text-2xl font-semibold mb-4">Security</h3>
            <div className="space-y-4">
              <button className="rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-100 transition">
                Change Password
              </button>
              <button className="rounded-lg border border-neutral-300 px-4 py-2 hover:bg-neutral-100 transition">
                Enable 2FA
              </button>
            </div>
          </section>
        )}

        {activeTab === "logout" && (
          <section className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold mb-4">Logout</h3>
            <button
              onClick={handleLogout}
             className="rounded-lg bg-[#e74c3c] px-4 py-2 text-white font-medium shadow hover:bg-[#c0392b] transition">
              Logout
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
