"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Bell,
  CalendarDays,
  ChevronDown,
  Home,
  IndianRupee,
  Plus,
  Trash2,
  Utensils,
  GraduationCap,
  HeartPulse,
  Bus,
  MoreHorizontal,
  Wallet,
  X,
} from "lucide-react";


// =========================================================
// TYPES
// =========================================================

type Expense = {
  id: number;
  user_id: number;
  title: string;
  category: string;
  amount: number;
  note?: string | null;
  expense_date?: string;
  created_at?: string;
};


// =========================================================
// API
// =========================================================

// Temporary development user.
// Later JWT authentication will provide this automatically.
const USER_ID = 1;

const API_URL = "http://localhost:8000/api";


// =========================================================
// PAGE
// =========================================================

export default function ExpensesPage() {

  const [showForm, setShowForm] = useState(false);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");


  // =======================================================
  // LOAD EXPENSES FROM BACKEND
  // =======================================================

  async function loadExpenses() {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/expenses?user_id=${USER_ID}`
      );

      if (!response.ok) {
        throw new Error("Failed to load expenses");
      }

      const data = await response.json();

      setExpenses(data.expenses || []);

    } catch (error) {

      console.error("Error loading expenses:", error);

      setError(
        "Unable to load expenses. Please check whether the backend is running."
      );

    } finally {

      setLoading(false);

    }
  }


  // =======================================================
  // LOAD WHEN PAGE OPENS
  // =======================================================

  useEffect(() => {

    loadExpenses();

  }, []);


  // =======================================================
  // TOTAL EXPENSE
  // =======================================================

  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );


  // =======================================================
  // MONTHLY BUDGET
  // =======================================================

  const monthlyBudget = 8000;

  const remaining = monthlyBudget - totalExpense;


  // =======================================================
  // FORMAT DATE
  // =======================================================

  function formatDate(date?: string) {

    if (!date) {
      return "Today";
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }


  // =======================================================
  // ADD EXPENSE
  // =======================================================

  async function addExpense(e: React.FormEvent) {

    e.preventDefault();

    if (!title.trim() || !amount) {
      return;
    }

    const numericAmount = Number(amount);

    if (numericAmount <= 0) {
      return;
    }

    try {

      setSaving(true);
      setError("");

      const response = await fetch(
        `${API_URL}/expenses`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: USER_ID,
            title: title.trim(),
            category: category,
            amount: numericAmount,
            note: note.trim() || null,
          }),
        }
      );


      if (!response.ok) {

        const errorData = await response.text();

        console.error(
          "Backend error:",
          errorData
        );

        throw new Error(
          "Failed to add expense"
        );
      }


      const data = await response.json();


      // Add the expense returned by backend
      setExpenses((previous) => [
        data.expense,
        ...previous,
      ]);


      // Clear form
      setTitle("");
      setAmount("");
      setCategory("Food");
      setNote("");

      setShowForm(false);


    } catch (error) {

      console.error(
        "Error adding expense:",
        error
      );

      setError(
        "Unable to save expense. Please check the backend."
      );

    } finally {

      setSaving(false);

    }
  }


  // =======================================================
  // DELETE EXPENSE
  // =======================================================

  async function deleteExpense(id: number) {

    try {

      setError("");

      const response = await fetch(
        `${API_URL}/expenses/${id}`,
        {
          method: "DELETE",
        }
      );


      if (!response.ok) {

        throw new Error(
          "Failed to delete expense"
        );
      }


      // Remove from UI after successful deletion
      setExpenses((previous) =>
        previous.filter(
          (expense) => expense.id !== id
        )
      );


    } catch (error) {

      console.error(
        "Error deleting expense:",
        error
      );

      setError(
        "Unable to delete expense."
      );

    }
  }


  // =======================================================
  // PAGE
  // =======================================================

  return (

    <main className="expenses-page">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="expenses-sidebar">

        <div className="expenses-brand">

          <div className="expenses-brand-icon">
            <Home size={21} />
          </div>

          <div>
            <strong>ASRA</strong>
            <small>
              Support · Guide · Empower
            </small>
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


      {/* =================================================
          MAIN
      ================================================= */}

      <section className="expenses-main">


        {/* =================================================
            HEADER
        ================================================= */}

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


          <button
            className="expenses-notification"
          >
            <Bell size={19} />
          </button>

        </header>


        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (

          <div
            style={{
              padding: "12px 16px",
              marginBottom: "20px",
              borderRadius: "10px",
              background: "#fff1f1",
              color: "#a33",
              border: "1px solid #f0caca",
            }}
          >
            {error}
          </div>

        )}


        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="expense-summary">

          <div className="expense-summary-card">

            <div className="expense-summary-icon">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>
                Monthly Budget
              </span>

              <strong>
                ₹{monthlyBudget.toLocaleString("en-IN")}
              </strong>
            </div>

          </div>


          <div className="expense-summary-card">

            <div className="expense-summary-icon">
              <Wallet size={21} />
            </div>

            <div>
              <span>
                Total Spent
              </span>

              <strong>
                ₹{totalExpense.toLocaleString("en-IN")}
              </strong>
            </div>

          </div>


          <div className="expense-summary-card">

            <div className="expense-summary-icon">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>
                Remaining
              </span>

              <strong>
                ₹{Math.max(
                  remaining,
                  0
                ).toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

        </section>


        {/* =================================================
            PROGRESS
        ================================================= */}

        <section className="budget-card">

          <div className="budget-header">

            <div>

              <h2>
                September Budget
              </h2>

              <p>
                You have spent ₹
                {totalExpense.toLocaleString("en-IN")}
                {" "}of ₹
                {monthlyBudget.toLocaleString("en-IN")}
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


        {/* =================================================
            EXPENSE LIST
        ================================================= */}

        <section className="expense-list-section">

          <div className="expense-list-header">

            <div>

              <h2>
                Recent Expenses
              </h2>

              <p>
                Your latest household transactions.
              </p>

            </div>


            <button
              className="add-expense-button"
              onClick={() =>
                setShowForm(true)
              }
            >

              <Plus size={17} />

              Add Expense

            </button>

          </div>


          <div className="expense-list">


            {/* LOADING */}

            {loading && (

              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                }}
              >
                Loading expenses...
              </div>

            )}


            {/* EMPTY */}

            {!loading &&
              expenses.length === 0 && (

                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                  }}
                >

                  <Wallet
                    size={35}
                    style={{
                      marginBottom: "10px",
                    }}
                  />

                  <p>
                    No expenses yet.
                  </p>

                  <small>
                    Add your first household expense.
                  </small>

                </div>

              )}


            {/* EXPENSES */}

            {!loading &&
              expenses.map(
                (expense) => (

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

                      {formatDate(
                        expense.expense_date ||
                        expense.created_at
                      )}

                    </div>


                    <strong className="expense-amount">

                      ₹{Number(
                        expense.amount
                      ).toLocaleString("en-IN")}

                    </strong>


                    <button
                      className="delete-expense"

                      onClick={() =>
                        deleteExpense(
                          expense.id
                        )
                      }

                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                )
              )}

          </div>

        </section>

      </section>


      {/* =================================================
          ADD EXPENSE MODAL
      ================================================= */}

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
                onClick={() =>
                  setShowForm(false)
                }
                className="close-modal"
              >

                <X size={20} />

              </button>

            </div>


            <form
              className="expense-form"
              onSubmit={addExpense}
            >


              {/* EXPENSE NAME */}

              <label>

                Expense Name

                <input
                  type="text"
                  placeholder="e.g. Grocery shopping"

                  value={title}

                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }

                  required
                />

              </label>


              {/* AMOUNT */}

              <label>

                Amount

                <div className="amount-input">

                  <IndianRupee size={17} />

                  <input
                    type="number"
                    placeholder="Enter amount"

                    value={amount}

                    onChange={(e) =>
                      setAmount(
                        e.target.value
                      )
                    }

                    min="1"
                    step="0.01"

                    required
                  />

                </div>

              </label>


              {/* CATEGORY */}

              <label>

                Category

                <div className="select-wrapper">

                  <select
                    value={category}

                    onChange={(e) =>
                      setCategory(
                        e.target.value
                      )
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


              {/* NOTE */}

              <label>

                Note

                <input
                  type="text"
                  placeholder="Optional note"

                  value={note}

                  onChange={(e) =>
                    setNote(
                      e.target.value
                    )
                  }
                />

              </label>


              {/* BUTTONS */}

              <div className="expense-form-buttons">

                <button
                  type="button"
                  className="cancel-expense"

                  onClick={() =>
                    setShowForm(false)
                  }

                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="save-expense"

                  disabled={saving}

                >

                  {saving
                    ? "Saving..."
                    : "Save Expense"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>
  );
}