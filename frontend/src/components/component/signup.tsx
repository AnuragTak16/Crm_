'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post('http://localhost:3000/api/signup', formData);

      setMessage('Signup successful! Redirecting to login...');
      setFormData({ name: '', email: '', password: '' });

      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'Something went wrong');
      } else {
        setMessage('Server error, please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen w-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden'>
      {/* Left Section */}
      <div className='hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-red-500 to-pink-500 text-white p-12 relative'>
        {/* Decorative shapes */}
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute top-20 left-20 w-40 h-40 rounded-full bg-white/20'></div>
          <div className='absolute bottom-20 right-20 w-32 h-32 rounded-full bg-white/10'></div>
        </div>

        <div className='relative z-10 text-center max-w-md'>
          <h1 className='text-5xl font-extrabold'>Join Us</h1>
          <p className='mt-6 text-lg text-white/90 leading-relaxed'>
            Create your account and unlock access to powerful tools designed to
            help you grow and succeed.
          </p>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className='flex flex-col justify-center items-center bg-gray-50 px-8'>
        <Card className='w-full max-w-md border-0 shadow-xl rounded-2xl bg-white'>
          <CardContent className='p-10'>
            <div className='mb-8 text-center'>
              <h2 className='text-3xl font-bold text-gray-800'>
                Create Account
              </h2>
              <p className='text-gray-500 mt-2'>
                Already have an account?{' '}
                <span
                  onClick={() => navigate('/')}
                  className='text-red-500 cursor-pointer hover:underline font-medium'
                >
                  Login
                </span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <Label htmlFor='name' className='text-gray-700 font-medium'>
                  Full Name
                </Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='John Doe'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='mt-2 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg'
                />
              </div>

              <div>
                <Label htmlFor='email' className='text-gray-700 font-medium'>
                  Email Address
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='mt-2 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg'
                />
              </div>

              <div>
                <Label htmlFor='password' className='text-gray-700 font-medium'>
                  Password
                </Label>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='********'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className='mt-2 h-12 border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg'
                />
              </div>

              {message && (
                <p
                  className={`text-center text-sm ${
                    message.includes('successful')
                      ? 'text-green-600 bg-green-50'
                      : 'text-red-600 bg-red-50'
                  } p-2 rounded-lg`}
                >
                  {message}
                </p>
              )}

              <Button
                type='submit'
                className='w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition'
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>

              <Button
                type='button'
                className='w-full h-12 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 rounded-lg transition'
              >
                <svg className='w-5 h-5' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  />
                  <path
                    fill='currentColor'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  />
                  <path
                    fill='currentColor'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  />
                </svg>
                Sign up with Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
