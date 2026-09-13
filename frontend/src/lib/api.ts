const API_URL = "http://127.0.0.1:8000";


// --------------------------------------------------
// GET EXPENSES
// --------------------------------------------------

export async function getExpenses(userId: number) {

    const response = await fetch(
        `${API_URL}/api/expenses?user_id=${userId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch expenses");
    }

    return response.json();
}


// --------------------------------------------------
// ADD EXPENSE
// --------------------------------------------------

export async function addExpense(expense: {
    user_id: number;
    title: string;
    category: string;
    amount: number;
    note?: string;
}) {

    const response = await fetch(
        `${API_URL}/api/expenses`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(expense),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add expense");
    }

    return response.json();
}