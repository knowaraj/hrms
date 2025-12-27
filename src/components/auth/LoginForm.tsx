import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { setAuthData } from '../../utils/auth';

/* =======================
   Types & Interfaces
======================= */

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface MockCredential {
  email: string;
  password: string;
  role: 'admin' | 'employee' | 'supervisor';
  redirect: string;
}


const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mockCredentials: MockCredential[] = [
    {
      email: 'admin@foursymmetronshrms.com',
      password: 'Admin@2025',
      role: 'admin',
      redirect: '/admin-dashboard'
    },
    {
      email: 'employee@foursymmetronshrms.com',
      password: 'Employee@2025',
      role: 'employee',
      redirect: '/employee-dashboard'
    },
    {
      email: 'supervisor@foursymmetronshrms.com',
      password: 'Supervisor@2025',
      role: 'supervisor',
      redirect: '/employee-dashboard'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof LoginErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const user = mockCredentials.find(
        cred =>
          cred.email === formData.email &&
          cred.password === formData.password
      );

      if (user) {
        setAuthData(
          `mock-jwt-token-${Date.now()}`,
          user.role,
          user.email
        );

        navigate(user.redirect, { replace: true });
      } else {
        setErrors({
          general:
            'Invalid email or password. Please check your credentials and try again.'
        });
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
  {errors.general && (
    <div className="flex gap-3 rounded-xl border border-error/30 bg-error/10 px-4 py-3">
      <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
      <p className="text-sm text-error">{errors.general}</p>
    </div>
  )}

  <Input
    label="Email address"
    type="email"
    name="email"
    placeholder="you@company.com"
    value={formData.email}
    onChange={handleChange}
    error={errors.email}
    disabled={isLoading}
  />

  <div className="relative">
    <Input
      label="Password"
      type={showPassword ? 'text' : 'password'}
      name="password"
      placeholder="••••••••"
      value={formData.password}
      onChange={handleChange}
      error={errors.password}
      disabled={isLoading}
    />

    <button
      type="button"
      onClick={() => setShowPassword(p => !p)}
      className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition"
      disabled={isLoading}
    >
      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
    </button>
  </div>

  <div className="flex items-center justify-between text-sm">
    <label className="flex items-center gap-2 text-muted-foreground">
      <input type="checkbox" className="rounded border-border" />
      Remember me
    </label>

    <button
      type="button"
      onClick={() => navigate('/forgot-password')}
      className="text-primary hover:underline"
      disabled={isLoading}
    >
      Forgot password?
    </button>
  </div>

  <Button
    type="submit"
    fullWidth
    loading={isLoading}
    className="mt-2 press-scale glow-amber-hover"
  >
    {isLoading ? 'Signing in…' : 'Sign in'}
  </Button>
</form>

  );
};

export default LoginForm;
