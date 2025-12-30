import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { setAuthData } from '../../utils/auth';
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
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mockCredentials: MockCredential[] = [
    {
      email: 'admin@foursymmetronshrms.com',
      password: 'Admin@2025',
      role: 'admin',
      redirect: '/dashboard'
    },
    {
      email: 'employee@foursymmetronshrms.com',
      password: 'Employee@2025',
      role: 'employee',
      redirect: '/dashboard'
    },
    {
      email: 'supervisor@foursymmetronshrms.com',
      password: 'Supervisor@2025',
      role: 'supervisor',
      redirect: '/dashboard'
    }
  ];

  const onFinish = (values: LoginFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      const user = mockCredentials.find(
        cred => cred.email === values.email && cred.password === values.password
      );

      if (user) {
        setAuthData(`mock-jwt-token-${Date.now()}` , user.role, user.email);
        navigate(user.redirect, { replace: true });
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.'
        });
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="space-y-5">
      {errors.general && (
        <Alert type="error" message={errors.general} showIcon />
      )}

      <Form
        layout="vertical"
        onFinish={onFinish}
        disabled={isLoading}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="you@company.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Password is required' },
            { min: 8, message: 'Password must be at least 8 characters' },
          ]}
        >
          <Input.Password
            placeholder="••••••••"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <div className="flex items-center justify-between text-sm">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Button type="link" onClick={() => navigate('/forgot-password')}>
            Forgot password?
          </Button>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign in'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
