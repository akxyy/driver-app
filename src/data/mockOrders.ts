import { Order } from '../types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customerName: 'Sarah Johnson',
    phoneNumber: '+1 (555) 123-4567',
    address: '123 Oak Street, Downtown, City 12345',
    location: 'Downtown District',
    orderValue: 24.50,
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: 'ORD-2024-002',
    customerName: 'Michael Chen',
    phoneNumber: '+1 (555) 987-6543',
    address: '456 Pine Avenue, Westside, City 12346',
    location: 'Westside Mall',
    orderValue: 18.75,
    status: 'auto_dispatch',
    createdAt: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
  },
  {
    id: 'ORD-2024-003',
    customerName: 'Emily Rodriguez',
    phoneNumber: '+1 (555) 456-7890',
    address: '789 Maple Drive, Northside, City 12347',
    location: 'Northside Plaza',
    orderValue: 32.25,
    status: 'accepted',
    createdAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
  },
  {
    id: 'ORD-2024-004',
    customerName: 'David Kim',
    phoneNumber: '+1 (555) 321-0987',
    address: '321 Elm Street, Eastside, City 12348',
    location: 'Eastside Market',
    orderValue: 41.80,
    status: 'driver_at_pickup',
    createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
  },
  {
    id: 'ORD-2024-005',
    customerName: 'Lisa Thompson',
    phoneNumber: '+1 (555) 654-3210',
    address: '654 Cedar Lane, Southside, City 12349',
    location: 'Southside Center',
    orderValue: 28.90,
    status: 'picked',
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
  },
];