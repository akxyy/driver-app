import React from 'react';
import { MapPin, Phone, Clock, DollarSign, Package, Check, X, ArrowRight } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrderCardProps {
  order: Order;
  onAccept?: (orderId: string) => void;
  onDecline?: (orderId: string) => void;
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  auto_dispatch: { label: 'Auto Dispatch', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: ArrowRight },
  dispatch_failed: { label: 'Dispatch Failed', color: 'bg-red-100 text-red-800 border-red-200', icon: X },
  accepted: { label: 'Accepted', color: 'bg-green-100 text-green-800 border-green-200', icon: Check },
  driver_at_pickup: { label: 'At Pickup', color: 'bg-purple-100 text-purple-800 border-purple-200', icon: MapPin },
  picked: { label: 'Picked Up', color: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: Package },
  driver_at_dropoff: { label: 'At Dropoff', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: MapPin },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Check },
};

const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
  const statusFlow: Record<OrderStatus, OrderStatus | null> = {
    pending: null,
    auto_dispatch: null,
    dispatch_failed: null,
    accepted: 'driver_at_pickup',
    driver_at_pickup: 'picked',
    picked: 'driver_at_dropoff',
    driver_at_dropoff: 'completed',
    completed: null,
  };
  return statusFlow[currentStatus];
};

export default function OrderCard({ order, onAccept, onDecline, onStatusChange }: OrderCardProps) {
  const config = statusConfig[order.status];
  const Icon = config.icon;
  const nextStatus = getNextStatus(order.status);
  const canAcceptDecline = order.status === 'pending' || order.status === 'auto_dispatch';
  const canProgress = nextStatus && onStatusChange;

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 active:scale-95 transition-transform">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{order.customerName}</h3>
            <p className="text-sm text-gray-600">{order.id}</p>
          </div>
        </div>
        <span className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-semibold border ${config.color}`}>
          <Icon size={16} />
          <span>{config.label}</span>
        </span>
      </div>

      {/* Order Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <Phone size={16} className="text-gray-600" />
          </div>
          <span className="text-gray-900 font-medium">{order.phoneNumber}</span>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-1">
            <MapPin size={16} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-semibold">{order.location}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{order.address}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign size={16} className="text-green-600" />
            </div>
            <span className="text-xl font-bold text-green-600">${order.orderValue.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <Clock size={14} />
            <span className="text-sm">{formatTime(order.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {canAcceptDecline && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onDecline?.(order.id)}
              className="bg-red-50 hover:bg-red-100 text-red-600 border-2 border-red-200 py-4 px-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <X size={20} />
              <span>Decline</span>
            </button>
            <button
              onClick={() => onAccept?.(order.id)}
              className="bg-green-600 hover:bg-green-700 text-white py-4 px-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-lg"
            >
              <Check size={20} />
              <span>Accept</span>
            </button>
          </div>
        )}
        
        {canProgress && (
          <button
            onClick={() => onStatusChange(order.id, nextStatus)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-lg"
          >
            <ArrowRight size={20} />
            <span>Mark as {statusConfig[nextStatus].label}</span>
          </button>
        )}
      </div>
    </div>
  );
}