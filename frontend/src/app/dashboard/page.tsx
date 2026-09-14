"use client";

import Link from "next/link";
import {
  Bell,
  Bot,
  ChevronRight,
  FileText,
  Home,
  IndianRupee,
  Menu,
  Settings,
  UserRound,
  Wallet,
  Landmark,
  MessageCircle,
  X,
} from "lucide-react";

import { useState } from "react";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="dashboard-page">

      {/* MOBILE HEADER */}
      <header className="mobile-dashboard-header">
        <button
          className="mobile-menu-button"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>

        <div className="dashboard-mobile-logo">
          <span>ASRA</span>
        </div>

        <Bell size={21} />
      </header>


      {/* SIDEBAR */}

      <aside
        className={`dashboard-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

        <div className="sidebar-top">

          <div className="dashboard-brand">
            <div className="dashboard-brand-icon">
              <Home size={21} />
            </div>

            <div>
              <strong>ASRA</strong>
              <small>Support · Guide · Empower</small>
            </div>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>

        </div>


        <nav className="dashboard-navigation">

          <Link
            href="/dashboard"
            className="dashboard-nav-item active"
          >
            <Home size={19} />
            <span>Home</span>
          </Link>

          <Link
            href="/expenses"
            className="dashboard-nav-item"
          >
            <Wallet size={19} />
            <span>My Expenses</span>
          </Link>

          <Link
            href="/schemes"
            className="dashboard-nav-item"
          >
            <FileText size={19} />
            <span>Government Schemes</span>
          </Link>

          <Link
            href="/assistant"
            className="dashboard-nav-item"
          >
            <Bot size={19} />
            <span>ASRA Assistant</span>
          </Link>

	<Link
	href="/reminders"
	className="dashboard-nav-item"
	>
	<Bell size={19} />
	<span>Reminders</span>
	</Link>
        </nav>


        <div className="sidebar-bottom">

          <Link
            href="/profile"
            className="dashboard-nav-item"
          >
            <UserRound size={19} />
            <span>My Profile</span>
          </Link>

	<Link href="/settings" className="dashboard-nav-item">
	  <Settings size={19} />
	  <span>Settings</span>
	</Link>
        </div>

      </aside>


      {/* MAIN CONTENT */}

      <section className="dashboard-content">

        {/* TOP BAR */}

        <div className="dashboard-topbar">

          <div>
            <span className="dashboard-small-text">
              ASRA Dashboard
            </span>

            <h1>
              Namaste! <span>👋</span>
            </h1>

            <p>
              How can ASRA help you today?
            </p>
          </div>


          <div className="dashboard-user-area">

	    <button
  type="button"
  className="notification-button"
  onClick={() => alert("You have 3 pending reminders.")}
>
  <Bell size={20} />
  <span className="notification-dot"></span>
</button>
            <div className="dashboard-user">

              <div className="dashboard-user-avatar">
                <UserRound size={19} />
              </div>

              <div>
                <strong>My Account</strong>
                <small>Family Support</small>
              </div>

            </div>

          </div>

        </div>


        {/* SUMMARY CARDS */}

        <div className="dashboard-summary">

          <div className="summary-card">

            <div className="summary-icon">
              <IndianRupee size={20} />
            </div>

            <div>
              <span>Monthly Expenses</span>
              <strong>₹4,250</strong>
              <small>This month</small>
            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon">
              <FileText size={20} />
            </div>

            <div>
              <span>Available Schemes</span>
              <strong>8</strong>
              <small>For your family</small>
            </div>

          </div>


          <div className="summary-card">

            <div className="summary-icon">
              <Bell size={20} />
            </div>

            <div>
              <span>Reminders</span>
              <strong>3</strong>
              <small>Need attention</small>
            </div>

          </div>

        </div>


        {/* QUICK HELP */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>
              <h2>What would you like help with?</h2>

              <p>
                Choose an option to get started.
              </p>
            </div>

          </div>


          <div className="quick-help-grid">

            <Link
              href="/expenses"
              className="quick-help-card"
            >

              <div className="quick-help-icon">
                <Wallet size={24} />
              </div>

              <div>
                <h3>Manage Expenses</h3>
                <p>
                  Track and manage your household expenses.
                </p>
              </div>

              <ChevronRight size={19} />

            </Link>


            <Link
              href="/schemes"
              className="quick-help-card"
            >

              <div className="quick-help-icon">
                <FileText size={24} />
              </div>

              <div>
                <h3>Government Schemes</h3>
                <p>
                  Find schemes and benefits available to you.
                </p>
              </div>

              <ChevronRight size={19} />

            </Link>


	   <Link href="/assistant" className="quick-help-card">
  <div className="quick-help-icon">
    <Landmark size={24} />
  </div>

  <div>
    <h3>Banking Help</h3>
    <p>
      Get simple guidance for common bank tasks.
    </p>
  </div>

  <ChevronRight size={19} />
</Link>
          </div>

        </section>


        {/* ASRA ASSISTANT */}

        <section className="assistant-preview">

          <div className="assistant-preview-icon">
            <Bot size={27} />
          </div>

          <div className="assistant-preview-content">

            <span>ASRA ASSISTANT</span>

            <h2>
              Need help with something?
            </h2>

            <p>
              Ask ASRA about expenses, banking,
              government schemes or everyday tasks.
            </p>

            <Link
              href="/assistant"
              className="assistant-button"
            >
              <MessageCircle size={17} />
              Talk to ASRA
            </Link>

          </div>

        </section>

      </section>

    </main>
  );
}
