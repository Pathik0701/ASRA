// =========================================================
// ASRA AUTHENTICATION UTILITIES
// =========================================================

// Get JWT token
export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("access_token");
}


// =========================================================
// GET LOGGED-IN USER
// =========================================================

export function getUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}


// =========================================================
// CHECK LOGIN STATUS
// =========================================================

export function isLoggedIn(): boolean {
  return !!getToken();
}


// =========================================================
// LOGOUT
// =========================================================

export function logout() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}


// =========================================================
// AUTHORIZATION HEADER
// =========================================================

export function getAuthHeaders() {
  const token = getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}