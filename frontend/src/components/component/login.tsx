'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface StoredData {
    accessToken: string;
    refreshToken: string;
    user: unknown;
  }
  const [_storedData, setStoredData] = useState<StoredData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      localStorage.setItem('accessToken', response.data.AccessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log(_storedData);

      setStoredData({
        accessToken: response.data.AccessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
      });
      navigate('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Something went wrong');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('user');

    if (accessToken && refreshToken && user) {
      setStoredData({ accessToken, refreshToken, user: JSON.parse(user) });
    }
  }, []);

  return (
    <div className='min-h-full bg- grid grid-cols-1 md:grid-cols-2'>
      {/* Left Section */}
      <div className='bg-gray-500 text-white flex flex-col justify-center items-center p-10 relative'>
        <h1 className='text-4xl font-bold'>
          Login Page <span className='block'></span>
        </h1>
        <p className='mt-6 text-lg text-center max-w-md'>
          Skip repetitive and manual sales-marketing tasks. Get highly
          productive through automation and save tons of time!
        </p>
        <p className='absolute bottom-4 text-sm text-gray-300'></p>
      </div>

      {/* Right Section */}
      <div className='flex flex-col justify-center items-center bg-white px-6'>
        <Card className='w-full max-w-sm border-none shadow-none'>
          <CardContent>
            <h2 className='text-2xl font-bold mb-2'>Welcome Back!</h2>
            <p className='text-gray-500 text-sm mb-6'>
              Don’t have an account?{' '}
              <span
                onClick={() => navigate('/signup')}
                className='text-purple-600 cursor-pointer hover:underline'
              >
                Create a new account now
              </span>
            </p>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='********'
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className='text-red-500 text-sm'>{error}</p>}

              <Button
                type='submit'
                className='w-full bg-black hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition'
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login Now'}
              </Button>

              <Button
                type='button'
                className='w-full flex items-center justify-center gap-2 border text-gray-600 py-3 rounded-lg transition'
              >
                <img
                  src='https://www.svgrepo.com/show/355037/google.svg'
                  alt='google'
                  className='w-5 h-5'
                />
                Login with Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
