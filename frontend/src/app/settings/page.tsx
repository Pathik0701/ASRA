"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Globe, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("asra_notifications") !== "false";
  });

  const [reminderAlerts, setReminderAlerts] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("asra_reminder_alerts") !== "false";
  });

  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "English";
    return localStorage.getItem("asra_language") || "English";
  });
  const [saved, setSaved] = useState(false);

function saveSettings() {
  localStorage.setItem("asra_notifications", String(notifications));
  localStorage.setItem("asra_reminder_alerts", String(reminderAlerts));
  localStorage.setItem("asra_language", language);

  setSaved(true);

  setTimeout(() => {
    setSaved(false);
  }, 2000);
}
  return (
    <main className="dashboard-page">
      <section className="dashboard-content">
        <div className="dashboard-topbar">
          <div>
            <Link href="/dashboard" className="dashboard-small-text">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1>Settings ⚙️</h1>
            <p>Manage your ASRA preferences.</p>
          </div>
        </div>

        <section className="dashboard-section">
          <h2>Preferences</h2>

          <div className="quick-help-grid">
            <div className="quick-help-card">
              <div className="quick-help-icon">
                <Bell size={24} />
              </div>

              <div style={{ flex: 1 }}>
                <h3>Notifications</h3>
                <p>Receive important ASRA notifications.</p>
              </div>

              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
            </div>

            <div className="quick-help-card">
              <div className="quick-help-icon">
                <Bell size={24} />
              </div>

              <div style={{ flex: 1 }}>
                <h3>Reminder Alerts</h3>
                <p>Receive alerts for your reminders.</p>
              </div>

              <input
                type="checkbox"
                checked={reminderAlerts}
                onChange={(e) => setReminderAlerts(e.target.checked)}
              />
            </div>

            <div className="quick-help-card">
              <div className="quick-help-icon">
                <Globe size={24} />
              </div>

              <div style={{ flex: 1 }}>
                <h3>Language</h3>
                <p>Choose your preferred language.</p>
              </div>

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </div>
	<div style={{ marginTop: "24px" }}>
  <button
    type="button"
    className="primary-btn"
    onClick={saveSettings}
  >
    <Save size={17} />
    Save Settings
  </button>

  {saved && (
    <p
      style={{
        marginTop: "12px",
        fontWeight: 600,
      }}
    >
      ✓ Settings saved successfully!
    </p>
  )}
</div>
	
        </section>
      </section>
    </main>
  );
}
