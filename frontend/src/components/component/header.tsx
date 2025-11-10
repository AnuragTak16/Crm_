import { useState } from 'react';
import { Search, Menu, Bell } from 'lucide-react';
import axios from 'axios';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
    : '';

  const [query, setQuery] = useState('');
  interface Lead {
    _id: string;
    name: string;
  }

  interface Employee {
    _id: string;
    name: string;
  }

  const [results, setResults] = useState<{
    leads: Lead[];
    employees: Employee[];
  }>({
    leads: [],
    employees: [],
  });

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults({ leads: [], employees: [] });
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/api/search?q=${value}`
      );
      setResults(res.data);
    } catch (err) {
      console.error('Search failed', err);
    }
  };

  return (
    <header className='bg-white border-b border-gray-200 px-4 py-3 lg:px-8 shadow-sm'>
      <div className='flex items-center justify-between gap-4'>
        {/* Left Section with Menu + Logo */}
        <div className='flex items-center gap-4'>
          <button
            onClick={onMenuClick}
            className='lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100'
          >
            <Menu className='w-6 h-6' />
          </button>

          {/* Company Logo */}
          <div className='flex items-center gap-2 cursor-pointer'>
            <img
              src='/1-removebg-preview (1).png' // replace with your logo path
              alt='Company Logo'
              className='h-20 w-auto'
            />
            <span className='text-lg font-bold text-gray-800 hidden sm:block'>
              HelixCrm
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className='flex-1 max-w-md lg:max-w-lg relative'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search leads, employees...'
              value={query}
              onChange={handleSearch}
              className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm'
            />

            {query && (
              <div className='absolute left-0 top-full w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-50 max-h-60 overflow-auto'>
                {results.leads.map((lead) => (
                  <div
                    key={lead._id}
                    className='p-2 hover:bg-gray-100 cursor-pointer'
                  >
                    Lead: {lead.name}
                  </div>
                ))}
                {results.employees.map((emp) => (
                  <div
                    key={emp._id}
                    className='p-2 hover:bg-gray-100 cursor-pointer'
                  >
                    Employee: {emp.name}
                  </div>
                ))}
                {results.leads.length === 0 &&
                  results.employees.length === 0 && (
                    <div className='p-2 text-gray-500'>No results found</div>
                  )}
              </div>
            )}
          </div>
        </div>

        {/* Right Section with Notifications + User */}
        <div className='flex items-center gap-4'>
          <button className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg relative'>
            <Bell className='w-6 h-6' />
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </button>

          <div className='flex items-center gap-3'>
            <div className='hidden sm:block text-right'>
              <div className='text-sm font-semibold text-gray-900'>
                {user?.name || 'Guest'}
              </div>
              <div className='text-xs text-gray-500'>
                {user?.role || 'Visitor'}
              </div>
            </div>
            <div className='w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md'>
              <span className='text-sm font-semibold text-white'>
                {initials || '--'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
