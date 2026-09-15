"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, isLoggedIn } from "@/lib/auth";

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

type Expense = {
  id: number;
  user_id?: number;
  title: string;
  category: string;
  amount: number;
  note?: string;
  date: string;
  expense_date?: string;
  created_at?: string;
};

const API_URL = "http://127.0.0.1:8000";

function getToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access_token");
}

export default function ExpensesPage() {
  /* =========================================================
     STATE
     ========================================================= */

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/login");
    }
  }, [router]);

  const [showForm, setShowForm] = useState(false);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [note, setNote] = useState("");

  /* =========================================================
     GET EXPENSES FROM FASTAPI + POSTGRESQL
     ========================================================= */

  useEffect(() => {
  async function loadExpenses() {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/expenses`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        router.replace("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to load expenses. Status: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("GET expenses response:", data);

      const expenseList = Array.isArray(data)
        ? data
        : data.expenses || data.data || [];

      const formattedExpenses: Expense[] = expenseList.map(
        (expense: {
          id: number;
          user_id?: number;
          title: string;
          category: string;
          amount: number;
          note?: string;
          expense_date?: string;
          created_at?: string;
        }) => ({
          id: expense.id,
          user_id: expense.user_id,
          title: expense.title,
          category: expense.category,
          amount: Number(expense.amount),
          note: expense.note,

          date: expense.expense_date
            ? new Date(expense.expense_date).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )
            : expense.created_at
            ? new Date(expense.created_at).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )
            : "N/A",

          expense_date: expense.expense_date,
          created_at: expense.created_at,
        })
      );

      setExpenses(formattedExpenses);

    } catch (err) {
      console.error("Error loading expenses:", err);

      setError(
        "Unable to load expenses. Please make sure the backend is running."
      );

    } finally {
      setLoading(false);
    }
  }

  loadExpenses();
}, [router]);

  /* =========================================================
     CALCULATIONS
     ========================================================= */

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const monthlyBudget = 8000;

  const remaining = monthlyBudget - totalExpense;

  const budgetPercentage = Math.min(
    (totalExpense / monthlyBudget) * 100,
    100
  );

  /* =========================================================
     ADD EXPENSE
     ========================================================= */

  async function addExpense(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !amount.trim()) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        alert("Please login before adding an expense.");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/expenses`,
        {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: title.trim(),
            category,
            amount: Number(amount),
            note: note.trim(),
          }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to add expense. Status: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("POST expense response:", data);

      /*
        Your backend returns:

        {
          success: true,
          message: "Expense added successfully",
          expense: {...}
        }
      */

      if (data.expense) {
        const newExpense = data.expense;

        const formattedExpense: Expense = {
          id: newExpense.id,
          user_id: newExpense.user_id,
          title: newExpense.title,
          category: newExpense.category,
          amount: Number(newExpense.amount),
          note: newExpense.note,

          date: newExpense.expense_date
            ? new Date(
                newExpense.expense_date
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Today",

          expense_date: newExpense.expense_date,
          created_at: newExpense.created_at,
        };

        setExpenses((previous) => [
          formattedExpense,
          ...previous,
        ]);
      }

      /* Reset form */

      setTitle("");
      setAmount("");
      setCategory("Food");
      setNote("");

      setShowForm(false);
    } catch (err) {
      console.error("Error adding expense:", err);

      alert(
        "Unable to add expense. Please check whether the backend is running."
      );
    }
  }

 /* =========================================================
   DELETE EXPENSE

   Deletes the expense from PostgreSQL through
   the authenticated user's JWT.
   ========================================================= */

  async function deleteExpense(id: number) {
    try {
        const token = getToken();

        if (!token) {
          alert("Please login first.");
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          `${API_URL}/api/expenses/${id}`,
          {
            method: "DELETE",

            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");

          window.location.href = "/login";

          return;
        }

        if (!response.ok) {
            throw new Error(
                `Failed to delete expense. Status: ${response.status}`
            );
        }

        const data = await response.json();

        console.log("DELETE expense response:", data);

        // Only remove it from the UI after
        // PostgreSQL confirms successful deletion.
        setExpenses((previous) =>
            previous.filter((expense) => expense.id !== id)
        );

    } catch (error) {
        console.error("Error deleting expense:", error);

        alert(
            "Unable to delete expense. Please try again."
        );
    }
  }

  /* =========================================================
     UI
     ========================================================= */

  return (
    <main className="expenses-page">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

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

	  <Link href="/reminders" className="expenses-nav-item">
	<Bell size={19} />
	Reminders
	</Link>

	<Link href="/settings" className="expenses-nav-item">
	  Settings
	</Link>
        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

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


	<button
  type="button"
  className="expenses-notification"
  onClick={() => alert("You have 3 pending reminders.")}
>
  <Bell size={19} />
</button>
        </header>


        {/* ===================================================
            ERROR MESSAGE
            =================================================== */}

        {error && (
          <div
            style={{
              padding: "12px 16px",
              marginBottom: "20px",
              borderRadius: "10px",
              background: "#fff1f0",
              color: "#b42318",
              border: "1px solid #f5c2c0",
            }}
          >
            {error}
          </div>
        )}


        {/* ===================================================
            SUMMARY
            =================================================== */}

        <section className="expense-summary">

          <div className="expense-summary-card">

            <div className="expense-summary-icon">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>Monthly Budget</span>

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
              <span>Total Spent</span>

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
              <span>Remaining</span>

              <strong>
                ₹{Math.max(remaining, 0).toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

        </section>


        {/* ===================================================
            BUDGET
            =================================================== */}

        <section className="budget-card">

          <div className="budget-header">

            <div>

              <h2>
                September Budget
              </h2>

              <p>
                You have spent ₹
                {totalExpense.toLocaleString("en-IN")}
                {" "}of{" "}
                ₹{monthlyBudget.toLocaleString("en-IN")}
              </p>

            </div>

            <strong>
              {Math.round(budgetPercentage)}%
            </strong>

          </div>


          <div className="budget-progress">

            <div
              className="budget-progress-fill"
              style={{
                width: `${budgetPercentage}%`,
              }}
            />

          </div>

        </section>


        {/* ===================================================
            EXPENSE LIST
            =================================================== */}

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
              onClick={() => setShowForm(true)}
            >
              <Plus size={17} />
              Add Expense
            </button>

          </div>


          {/* LOADING */}

          {loading && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
              }}
            >
              Loading your expenses...
            </div>
          )}


          {/* EMPTY */}

          {!loading && expenses.length === 0 && !error && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
              }}
            >
              <p>No expenses added yet.</p>

              <p>
                Click <strong>Add Expense</strong> to add your
                first household expense.
              </p>
            </div>
          )}


          {/* EXPENSES */}

          {!loading && expenses.length > 0 && (
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

                    ₹{expense.amount.toLocaleString("en-IN")}

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
          )}

        </section>

      </section>


      {/* =====================================================
          ADD EXPENSE MODAL
          ===================================================== */}

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

              {/* EXPENSE NAME */}

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


              {/* AMOUNT */}

              <label>

                Amount

                <div className="amount-input">

                  <IndianRupee size={17} />

                  <input
                    type="number"
                    min="0"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
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


              {/* NOTE */}

              <label>

                Note

                <input
                  type="text"
                  placeholder="e.g. Weekly vegetables"
                  value={note}
                  onChange={(e) =>
                    setNote(e.target.value)
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
