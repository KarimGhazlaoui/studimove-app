// Types pour les transports
export interface Passenger {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Transport {
  id: string;
  eventId: string;
  name: string;
  type: string; // 'bus', 'plane', 'train', etc.
  provider: string;
  departureLocation: string;
  arrivalLocation: string;
  departureDateTime: string;
  arrivalDateTime: string;
  capacity: number;
  notes: string;
  contactPerson: string;
  contactPhone: string;
  assignedPassengers: Passenger[];
}
