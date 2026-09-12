"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowLeft,
  Bell,
  CalendarDays,
  ChevronDown,
  Home,
  IndianRupee,
  Plus,
  Search,
  Trash2,
  Utensils,
  GraduationCap,
  HeartPulse,
  Bus,
  MoreHorizontal,
  Wallet,
  X,
} from "lucide-react";

type Expense = {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
};

export default function ExpensesPage() {
  const [showForm, setShowForm] = useState(false);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      title: "Monthly groceries",
      category: "Food",
      amount: 1500,
      date: "10 Sep 2026",
    },
    {
      id: 2,
      title: "School books",
      category: "Education",
      amount: 1000,
      date: "08 Sep 2026",
    },
    {
      id: 3,
      title: "Medicine",
      category: "Health",
      amount: 750,
      date: "06 Sep 2026",
    },
    {
      id: 4,
      title: "Bus travel",
      category: "Travel",
      amount: 500,
      date: "04 Sep 2026",
    },
  ]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const monthlyBudget = 8000;

  const remaining = monthlyBudget - totalExpense;

  function addExpense(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !amount) {
      return;
    }

    const newExpense: Expense = {
      id: Date.now(),
      title,
      category,
      amount: Number(amount),
      date: "12 Sep 2026",
    };

    setExpenses((previous) => [newExpense, ...previous]);

    setTitle("");
    setAmount("");
    setCategory("Food");

    setShowForm(false);
  }

  function deleteExpense(id: number) {
    setExpenses((previous) =>
      previous.filter((expense) => expense.id !== id)
    );
  }

  return (
    <main className="expenses-page">

      {/* SIDEBAR */}

      <aside className="expenses-sidebar">

        <div className="expenses-brand">

          <div className="expenses-brand-icon">
            <Home size={21} />
          </div>

          <div>
            <strong>ASRA</strong>
            <small>Support · Guide · Empower</small>
          </div>

        </div>


        <nav className="expenses-navigation">

          <Link
            href="/dashboard"
            className="expenses-nav-item"
          >
            <Home size={19} />
            Home
          </Link>

          <Link
            href="/expenses"
            className="expenses-nav-item active"
          >
            <Wallet size={19} />
            My Expenses
          </Link>

          <Link
            href="/schemes"
            className="expenses-nav-item"
          >
            <GraduationCap size={19} />
            Government Schemes
          </Link>

          <Link
            href="/assistant"
            className="expenses-nav-item"
          >
            <MoreHorizontal size={19} />
            ASRA Assistant
          </Link>

        </nav>


        <div className="expenses-sidebar-bottom">

          <button className="expenses-nav-item">
            <Bell size={19} />
            Reminders
          </button>

          <button className="expenses-nav-item">
            Settings
          </button>

        </div>

      </aside>


      {/* MAIN */}

      <section className="expenses-main">

        {/* HEADER */}

        <header className="expenses-header">

          <div>

            <Link
              href="/dashboard"
              className="back-dashboard"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>

            <h1>
              My Expenses
            </h1>

            <p>
              Keep track of your household spending in one place.
            </p>

          </div>


          <button className="expenses-notification">
            <Bell size={19} />
          </button>

        </header>


        {/* SUMMARY */}

        <section className="expense-summary">

          <div className="expense-summary-card">

            <div className="expense-summary-icon">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>Monthly Budget</span>
              <strong>₹{monthlyBudget.toLocaleString()}</strong>
            </div>

          </div>


          <div className="expense-summary-card">

            <div className="expense-summary-icon">
              <Wallet size={21} />
            </div>

            <div>
              <span>Total Spent</span>
              <strong>₹{totalExpense.toLocaleString()}</strong>
            </div>

          </div>


          <div className="expense-summary-card">

            <div className="expense-summary-icon">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>Remaining</span>
              <strong>
                ₹{Math.max(remaining, 0).toLocaleString()}
              </strong>
            </div>

          </div>

        </section>


        {/* PROGRESS */}

        <section className="budget-card">

          <div className="budget-header">

            <div>
              <h2>September Budget</h2>

              <p>
                You have spent ₹{totalExpense.toLocaleString()} of ₹
                {monthlyBudget.toLocaleString()}
              </p>
            </div>

            <strong>
              {Math.round(
                (totalExpense / monthlyBudget) * 100
              )}
              %
            </strong>

          </div>


          <div className="budget-progress">

            <div
              className="budget-progress-fill"
              style={{
                width: `${Math.min(
                  (totalExpense / monthlyBudget) * 100,
                  100
                )}%`,
              }}
            />

          </div>

        </section>


        {/* EXPENSE LIST */}

        <section className="expense-list-section">

          <div className="expense-list-header">

            <div>
              <h2>Recent Expenses</h2>

              <p>
                Your latest household transactions.
              </p>
            </div>


            <button
              className="add-expense-button"
              onClick={() => setShowForm(true)}
            >
              <Plus size={17} />
              Add Expense
            </button>

          </div>


          <div className="expense-list">

            {expenses.map((expense) => (

              <div
                className="expense-row"
                key={expense.id}
              >

                <div className="expense-category-icon">

                  {expense.category === "Food" && (
                    <Utensils size={19} />
                  )}

                  {expense.category === "Education" && (
                    <GraduationCap size={19} />
                  )}

                  {expense.category === "Health" && (
                    <HeartPulse size={19} />
                  )}

                  {expense.category === "Travel" && (
                    <Bus size={19} />
                  )}

                  {expense.category === "Other" && (
                    <MoreHorizontal size={19} />
                  )}

                </div>


                <div className="expense-details">

                  <strong>
                    {expense.title}
                  </strong>

                  <span>
                    {expense.category}
                  </span>

                </div>


                <div className="expense-date">

                  <CalendarDays size={14} />

                  {expense.date}

                </div>


                <strong className="expense-amount">
                  ₹{expense.amount.toLocaleString()}
                </strong>


                <button
                  className="delete-expense"
                  onClick={() =>
                    deleteExpense(expense.id)
                  }
                >
                  <Trash2 size={16} />
                </button>

              </div>

            ))}

          </div>

        </section>

      </section>


      {/* ADD EXPENSE MODAL */}

      {showForm && (

        <div className="expense-modal-overlay">

          <div className="expense-modal">

            <div className="expense-modal-header">

              <div>

                <h2>
                  Add Expense
                </h2>

                <p>
                  Enter your household expense details.
                </p>

              </div>


              <button
                onClick={() => setShowForm(false)}
                className="close-modal"
              >
                <X size={20} />
              </button>

            </div>


            <form
              className="expense-form"
              onSubmit={addExpense}
            >

              <label>
                Expense Name

                <input
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />

              </label>


              <label>
                Amount

                <div className="amount-input">

                  <IndianRupee size={17} />

                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                  />

                </div>

              </label>


              <label>
                Category

                <div className="select-wrapper">

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                  >

                    <option value="Food">
                      Food
                    </option>

                    <option value="Education">
                      Education
                    </option>

                    <option value="Health">
                      Health
                    </option>

                    <option value="Travel">
                      Travel
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                  <ChevronDown size={17} />

                </div>

              </label>


              <div className="expense-form-buttons">

                <button
                  type="button"
                  className="cancel-expense"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-expense"
                >
                  Save Expense
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}