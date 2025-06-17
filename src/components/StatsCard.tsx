import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'blue' | 'yellow' | 'green' | 'purple' | 'red';
}

const colorConfig = {
  blue: 'bg-blue-100 text-blue-600',
  yellow: 'bg-yellow-100 text-yellow-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600',
};

export default function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 active:scale-95 transition-transform">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorConfig[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm font-semibold text-gray-600">{title}</p>
      </div>
    </div>
  );
}