import { useState } from 'react';
import { Package, Clock, CheckCircle, TrendingUp, User, LogOut, Home, List } from 'lucide-react';
import { Order, OrderStatus, User as UserType } from '../types';
import { mockOrders } from '../data/mockOrders';
import OrderCard from './OrderCard';
import StatsCard from './StatsCard';

interface DashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleAcceptOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'accepted' as OrderStatus } : order
    ));
  };

  const handleDeclineOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending' || o.status === 'auto_dispatch').length,
    inProgress: orders.filter(o => ['accepted', 'driver_at_pickup', 'picked', 'driver_at_dropoff'].includes(o.status)).length,
    completed: orders.filter(o => o.status === 'completed').length,
    todayEarnings: orders.reduce((sum, order) => sum + order.orderValue, 0),
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Driver Status */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{user.driver.name}</h2>
                    <p className="text-gray-600">{user.driver.id}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-600">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="p-3 bg-red-50 rounded-full text-red-600 hover:bg-red-100 transition-colors active:scale-95"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatsCard
                title="Total Orders"
                value={stats.total.toString()}
                icon={Package}
                color="blue"
              />
              <StatsCard
                title="Pending"
                value={stats.pending.toString()}
                icon={Clock}
                color="yellow"
              />
              <StatsCard
                title="In Progress"
                value={stats.inProgress.toString()}
                icon={TrendingUp}
                color="purple"
              />
              <StatsCard
                title="Today's Earnings"
                value={`$${stats.todayEarnings.toFixed(0)}`}
                icon={CheckCircle}
                color="green"
              />
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-blue-600 font-semibold text-sm"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                    <div>
                      <p className="font-semibold text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-600">${order.orderValue.toFixed(2)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Incoming Orders</h2>
              <p className="text-gray-600 text-sm">Manage your delivery orders</p>
            </div>
            
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders available</h3>
                <p className="text-gray-600">New orders will appear here when available.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onAccept={handleAcceptOrder}
                    onDecline={handleDeclineOrder}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Status Bar */}
      <div className="h-12 bg-blue-600"></div>

      {/* Header */}
      <div className="bg-blue-600 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">
          {activeTab === 'home' ? 'Dashboard' : 'Orders'}
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 pb-24 overflow-auto">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-bottom">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-2xl transition-all ${
              activeTab === 'home'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home size={24} />
            <span className="text-xs font-semibold">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-2xl transition-all relative ${
              activeTab === 'orders'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List size={24} />
            <span className="text-xs font-semibold">Orders</span>
            {stats.pending > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{stats.pending}</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}