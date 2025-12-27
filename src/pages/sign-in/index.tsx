import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import { useTheme } from '../../context/ThemeContext';
import Icon from '../../components/AppIcon';

const SignInPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <button
        onClick={toggleTheme}
        className="theme-toggle-button fixed top-6 right-6 z-50"
        aria-label="Toggle theme"
      >
        <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
      </button>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Icon name="Building2" size={32} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your HRMS account
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8">
            <LoginForm />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            © 2025 Four Symmetrons HRMS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;