"use client";

import Link from "next/link";
import { ArrowLeft, UserRound, Mail, Phone } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Test User");
  const [email, setEmail] = useState("test@asra.com");
  const [phone, setPhone] = useState("");
  const [saved, setSaved] = useState(false);

  function saveProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    localStorage.setItem("asra_profile_name", name);
    localStorage.setItem("asra_profile_email", email);
    localStorage.setItem("asra_profile_phone", phone);

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

            <h1>My Profile 👤</h1>
            <p>Manage your personal information.</p>
          </div>
        </div>

        <section className="dashboard-section">
          <form className="login-card" onSubmit={saveProfile}>
            <div className="quick-help-icon">
              <UserRound size={24} />
            </div>

            <h2>Personal Information</h2>

            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />

            <button type="submit" className="login-submit">
              Save Profile
            </button>

            {saved && (
              <p style={{ marginTop: "12px", fontWeight: 600 }}>
                ✓ Profile saved successfully!
              </p>
            )}
          </form>
        </section>
      </section>
    </main>
  );
}
