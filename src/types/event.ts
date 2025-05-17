// Types pour les événements
export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  status: string; // draft, scheduled, active, completed, cancelled
  maxParticipants: number;
  currentParticipants: number;
  organizerId: string;
}
