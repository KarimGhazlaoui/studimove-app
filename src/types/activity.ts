// Types pour les activités
export interface Activity {
  id: string;
  eventId: string;
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  status: string; // planned, ongoing, completed, cancelled
}
