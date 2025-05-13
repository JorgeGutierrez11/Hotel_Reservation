import { Room } from "./rooms.model";

export interface ReservationProps {
  id: number;
  customerId: number;
  startDate: string;
  endDate: string;
  reservationStatus: string;
  totalCost: number;
  taxes: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  room: Room;
}

export interface ReservationResponse {
  customerId: number; 
  startDate: string;
  endDate: string;
  reservationStatus: string; 
  checkInDate?: string;
  checkOutDate?: string;
  roomId: number;
}

export const empyReservationResponse:ReservationResponse = {
        customerId: 0,
        roomId: 0,
        reservationStatus: "",
        startDate: "",
        endDate: "",
    }
