import { Room } from "./rooms.model";

export interface ReservationProps {
  id: number;
  startDate: string;
  endDate: string;
  reservationStatus: string;
  totalCost: number;
  taxes: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  room: Room;
}
export interface ReservationToCheckOut {
  id: number;
  roomNumber: string;
  clientName: string;
  room: Room;
}
export interface ReservationResponse {
  roomId: number;
  reservationStatus: string;
  startDate: string;
  endDate: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export const empyReservationResponse: ReservationResponse = {
  roomId: 0,
  reservationStatus: "",
  startDate: "",
  endDate: "",
}

export interface Amenity {
  id: number;
  name: string;
}

export interface Reservation {
  id: number;
  startDate: string; 
  endDate: string;
  reservationStatus: string;
  totalCost: number;
  taxes: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  room: Room;
}
