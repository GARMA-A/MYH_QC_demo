export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'doctor';
  fullName: string;
  email?: string;
  createdAt: string;
}

// Fake accounts for testing
export const users: User[] = [
  {
    id: 'admin-1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    fullName: 'Dr. Sarah Johnson',
    email: 'admin@hospital.com',
    createdAt: '2024-01-01'
  },
  {
    id: 'doctor-1',
    username: 'doctor',
    password: 'doctor123',
    role: 'doctor',
    fullName: 'Dr. Michael Chen',
    email: 'mchen@hospital.com',
    createdAt: '2024-01-15'
  },
  {
    id: 'doctor-2',
    username: 'jsmith',
    password: 'pass123',
    role: 'doctor',
    fullName: 'Dr. Jennifer Smith',
    email: 'jsmith@hospital.com',
    createdAt: '2024-02-01'
  }
];
