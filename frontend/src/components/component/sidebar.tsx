'use client';
import { LayoutDashboard, Users, Building2, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  onLogoutClick: () => void;
}

export function Sidebar({ onLogoutClick }: SidebarProps) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    { id: 'leads', label: 'Leads', icon: Users, path: '/leads' },
    { id: 'employee', label: 'Employee', icon: Building2, path: '/employees' },
  ];

  return (
    <aside
      className='
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
        flex flex-col flex-shrink-0 p-6
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      '
    >
      <div className='mb-6'>
        <button
          className='
            w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold
            flex items-center justify-center gap-2 transition-colors
          '
        >
          Helix CRM
        </button>
      </div>

      <nav className='flex-1 flex flex-col gap-1'>
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
               ${
                 isActive
                   ? 'bg-gray-200 font-semibold text-gray-900'
                   : 'text-gray-700 hover:bg-gray-100'
               }`
            }
          >
            <item.icon className='w-5 h-5' />
            {item.label}
          </NavLink>
        ))}

        <button
          onClick={onLogoutClick}
          className='mt-auto flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-100 transition-colors font-medium'
        >
          <LogOut className='w-5 h-5 text-red-600' />
          Logout
        </button>
      </nav>
    </aside>
  );
}
