// Types pour les hébergements
export interface Participant {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Accommodation {
  id: string;
  eventId: string;
  name: string;
  type: string; // hotel, apartment, hostel, other
  capacity: number;
  address: string;
  contactPerson: string;
  contactPhone: string;
  notes: string;
  assignedParticipants: Participant[];
}
