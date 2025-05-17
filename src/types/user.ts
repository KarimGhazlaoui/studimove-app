export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'coordinator' | 'organizer' | 'staff';
  avatar?: string;
}