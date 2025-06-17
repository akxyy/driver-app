export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  location: string;
  orderValue: number;
  status: OrderStatus;
  createdAt: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'auto_dispatch'
  | 'dispatch_failed'
  | 'accepted'
  | 'driver_at_pickup'
  | 'picked'
  | 'driver_at_dropoff'
  | 'completed';

export interface Driver {
  name: string;
  id: string;
  avatar?: string;
}

export interface User {
  username: string;
  driver: Driver;
}