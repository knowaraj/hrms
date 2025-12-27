// Authentication utility functions

export const isAuthenticated = () => {
  const authToken = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');
  return !!(authToken && userRole);
};

export const getUserRole = () => {
  return localStorage.getItem('userRole');
};

export const getUserEmail = () => {
  return localStorage.getItem('userEmail');
};

export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');
  // Clear any other session data if needed
  sessionStorage.clear();
};

export const setAuthData = (token: string, role: string, email: string) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userRole', role);
  localStorage.setItem('userEmail', email);
};