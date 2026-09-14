"use client";

import Link from "next/link";
import { ArrowLeft, Bell, Plus, Check, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Reminder = {
  id: number;
  title: string;
  date: string;
  completed: boolean;
};

const defaultReminders: Reminder[] = [
  {
    id: 1,
    title: "Pay electricity bill",
    date: "Today, 6:00 PM",
    completed: false,
  },
  {
    id: 2,
    title: "Check government scheme application",
    date: "Tomorrow, 10:00 AM",
    completed: false,
  },
  {
    id: 3,
    title: "Call family member",
    date: "15 Sep, 8:00 PM",
    completed: true,
  },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = localStorage.getItem("asra_reminders");

      if (stored) {
        try {
          setReminders(JSON.parse(stored));
        } catch {
          setReminders(defaultReminders);
          localStorage.setItem(
            "asra_reminders",
            JSON.stringify(defaultReminders)
          );
        }
      } else {
        setReminders(defaultReminders);
        localStorage.setItem(
          "asra_reminders",
          JSON.stringify(defaultReminders)
        );
      }

      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function saveReminders(updatedReminders: Reminder[]) {
    setReminders(updatedReminders);
    localStorage.setItem(
      "asra_reminders",
      JSON.stringify(updatedReminders)
    );
  }

  function addReminder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !date) return;

    const newReminder: Reminder = {
      id: Date.now(),
      title: title.trim(),
      date,
      completed: false,
    };

    saveReminders([newReminder, ...reminders]);

    setTitle("");
    setDate("");
    setShowForm(false);
  }

  function toggleReminder(id: number) {
    saveReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  }

  function deleteReminder(id: number) {
    saveReminders(
      reminders.filter((reminder) => reminder.id !== id)
    );
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

            <h1>Reminders 🔔</h1>
            <p>Keep track of important household tasks.</p>
          </div>
        </div>

        <section className="dashboard-section">
          <div className="reminder-item">
            <div className="quick-help-icon">
              <Bell size={24} />
            </div>

            <div>
              <h2>My Reminders</h2>
              <p>Add, complete, or delete reminders.</p>
            </div>

            <button
              type="button"
              onClick={() => setShowForm(true)}
            >
              <Plus size={18} />
              Add Reminder
            </button>
          </div>

          {showForm && (
            <form
              className="login-card"
              onSubmit={addReminder}
              style={{ marginTop: "20px" }}
            >
              <h2>Add Reminder</h2>

              <label>Reminder</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pay electricity bill"
                required
              />

              <label>Date / Time</label>
		<input
  type="datetime-local"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  required
/>
              <div style={{ marginTop: "16px" }}>
                <button type="submit">
                  Save Reminder
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
		
		<div
  className="reminders-grid"
  style={{ marginTop: "20px" }}
>
            {hydrated &&
              reminders.map((reminder) => (
                <div
                  className="quick-help-card"
                  key={reminder.id}
                  style={{ marginBottom: "12px" }}
                >
                  <div className="quick-help-icon">
                    <Bell size={24} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        textDecoration: reminder.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {reminder.title}
                    </h3>

                    <p>{reminder.date}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleReminder(reminder.id)}
                    aria-label={
                      reminder.completed
                        ? "Mark reminder incomplete"
                        : "Mark reminder complete"
                    }
                  >
                    <Check size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteReminder(reminder.id)}
                    aria-label="Delete reminder"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </section>
    </main>
  );
}
