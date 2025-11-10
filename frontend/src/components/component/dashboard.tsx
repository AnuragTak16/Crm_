import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  UserCheck,
  TrendingUp,
  Target,
  Activity,
  Award,
} from 'lucide-react';

export const Dashboard = () => {
  const [leadsCount, setLeadsCount] = useState<number | null>(null);
  const [employeesCount, setEmployeesCount] = useState<number | null>(null);
  const [conversionRate] = useState<number>(23.5);
  const [activeDeals] = useState<number>(67);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [leadsRes, employeesRes] = await Promise.all([
          fetch('http://localhost:3000/api/leads/count'),
          fetch('http://localhost:3000/api/employees/count'),
        ]);

        const leadsData = await leadsRes.json();
        const employeesData = await employeesRes.json();

        setLeadsCount(leadsData.count);
        setEmployeesCount(employeesData.count);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch counts', error);
        setLoading(false);
      }
    };

    fetchCounts();

    const interval = setInterval(fetchCounts, 30000);
    return () => clearInterval(interval);
  }, []);

  // Mock data for charts
  const monthlyLeadsData = [
    { month: 'Jan', leads: 45, converted: 12 },
    { month: 'Feb', leads: 52, converted: 15 },
    { month: 'Mar', leads: 48, converted: 11 },
    { month: 'Apr', leads: 63, converted: 18 },
    { month: 'May', leads: 71, converted: 22 },
    { month: 'Jun', leads: 58, converted: 16 },
  ];

  const leadSourceData = [
    { name: 'Website', value: 35 },
    { name: 'Referral', value: 28 },
    { name: 'Social Media', value: 20 },
    { name: 'Email Campaign', value: 17 },
  ];

  const employeePerformanceData = [
    { name: 'John D.', deals: 24 },
    { name: 'Sarah M.', deals: 31 },
    { name: 'Mike R.', deals: 18 },
    { name: 'Emily W.', deals: 27 },
    { name: 'David L.', deals: 22 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const StatCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
    <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-sm font-medium text-gray-600'>{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className='w-5 h-5 text-white' />
        </div>
      </div>
      <p className='text-3xl font-bold text-gray-900 mb-1'>{value}</p>
      <p className='text-sm text-gray-500'>{subtitle}</p>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          <StatCard
            title='Total Leads'
            value={
              loading ? 'Loading...' : leadsCount !== null ? leadsCount : 'N/A'
            }
            icon={Users}
            color='bg-blue-500'
            subtitle='Active prospects in pipeline'
          />
          <StatCard
            title='Employees'
            value={
              loading
                ? 'Loading...'
                : employeesCount !== null
                ? employeesCount
                : 'N/A'
            }
            icon={UserCheck}
            color='bg-green-500'
            subtitle='Active team members'
          />
          <StatCard
            title='Conversion Rate'
            value={`${conversionRate}%`}
            icon={TrendingUp}
            color='bg-amber-500'
            subtitle='+2.4% from last month'
          />
          <StatCard
            title='Active Deals'
            value={activeDeals}
            icon={Target}
            color='bg-purple-500'
            subtitle='In progress this month'
          />
        </div>

        {/* Charts Row 1 */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Monthly Leads Trend */}
          <div className='lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <div className='flex items-center mb-4'>
              <Activity className='w-5 h-5 text-blue-600 mr-2' />
              <h3 className='text-lg font-semibold text-gray-900'>
                Monthly Leads Performance
              </h3>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={monthlyLeadsData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='month' stroke='#6b7280' />
                <YAxis stroke='#6b7280' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='leads'
                  stroke='#3b82f6'
                  strokeWidth={2}
                  name='Total Leads'
                />
                <Line
                  type='monotone'
                  dataKey='converted'
                  stroke='#10b981'
                  strokeWidth={2}
                  name='Converted'
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Lead Sources Pie Chart */}
          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <div className='flex items-center mb-4'>
              <Target className='w-5 h-5 text-green-600 mr-2' />
              <h3 className='text-lg font-semibold text-gray-900'>
                Lead Sources
              </h3>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Employee Performance */}
          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <div className='flex items-center mb-4'>
              <Award className='w-5 h-5 text-amber-600 mr-2' />
              <h3 className='text-lg font-semibold text-gray-900'>
                Top Performers
              </h3>
            </div>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={employeePerformanceData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='name' stroke='#6b7280' />
                <YAxis stroke='#6b7280' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey='deals' fill='#3b82f6' radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-sm'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Recent Activity
            </h3>
            <div className='space-y-4'>
              {[
                {
                  action: 'New lead added',
                  user: 'Sarah M.',
                  time: '5 min ago',
                  color: 'bg-blue-100 text-blue-800',
                },
                {
                  action: 'Deal closed',
                  user: 'John D.',
                  time: '1 hour ago',
                  color: 'bg-green-100 text-green-800',
                },
                {
                  action: 'Meeting scheduled',
                  user: 'Emily W.',
                  time: '2 hours ago',
                  color: 'bg-amber-100 text-amber-800',
                },
                {
                  action: 'Proposal sent',
                  user: 'Mike R.',
                  time: '3 hours ago',
                  color: 'bg-purple-100 text-purple-800',
                },
                {
                  action: 'Follow-up completed',
                  user: 'David L.',
                  time: '4 hours ago',
                  color: 'bg-pink-100 text-pink-800',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between py-3 border-b border-gray-100 last:border-0'
                >
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-gray-900'>
                      {activity.action}
                    </p>
                    <p className='text-xs text-gray-500'>by {activity.user}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${activity.color}`}
                  >
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
